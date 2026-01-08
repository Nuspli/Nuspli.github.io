#include<stdio.h>
#include<string.h>
#include<windows.h>
#include<time.h>

#define SCREENWIDTH 130
#define SCREENHEIGHT 50
#define MINE 9
#define FLAG 2

char screenBuffer[SCREENHEIGHT][SCREENWIDTH];
char previousScreen[SCREENHEIGHT][SCREENWIDTH];
HANDLE consoleHandle;

void clear_screen() {
    for (int y = 0; y < SCREENHEIGHT; y++) {
        for (int x = 0; x < SCREENWIDTH; x++) {
            screenBuffer[y][x] = ' ';
        }
    }
}

void update_screen() {    
    
    for (int y = 0; y < SCREENHEIGHT; y++) {
        for (int x = 0; x < SCREENWIDTH; x++) {
            if (screenBuffer[y][x] != previousScreen[y][x]) {
                COORD pos = {x, y};
                SetConsoleCursorPosition(consoleHandle, pos);
                
                char c = screenBuffer[y][x];
                WORD colorCode;
                
                switch (c) {
                    case '*':
                        colorCode = 5;
                        break;
                    case '#':
                        colorCode = 15;
                        break;
                    case '1':
                        colorCode = 9; 
                        break;
                    case '2':
                        colorCode = 2;
                        break;
                    case '3':
                        colorCode = 4;
                        break;
                    case '4':
                        colorCode = 1;
                        break;
                    case '5':
                        colorCode = 6;
                        break;
                    case '6':
                        colorCode = 3;
                        break;
                    case '7':
                        colorCode = 11;
                        break;
                    case '8':
                        colorCode = 12;
                        break;
                    
                    default:
                        colorCode = 15;
                        break;
                }
                
                SetConsoleTextAttribute(consoleHandle, colorCode);
                putchar(c);
                
                previousScreen[y][x] = c;
            }
        }
    }
    SetConsoleTextAttribute(consoleHandle, 15); // reset color to white
}

void init_console() {

    system("cls"); // clear console
    
    SMALL_RECT windowSize = {0, 0, SCREENWIDTH - 1, SCREENHEIGHT - 1};
    COORD bufferSize = {SCREENWIDTH, SCREENHEIGHT};

    SetConsoleWindowInfo(consoleHandle, 1, &windowSize);
    SetConsoleScreenBufferSize(consoleHandle, bufferSize);

    for (int y = 0; y < SCREENHEIGHT; y++) {
        for (int x = 0; x < SCREENWIDTH; x++) {
            screenBuffer[y][x] = ' ';
            previousScreen[y][x] = ' ';
        }
    }
}

void set_text(int x, int y, char *text, int length) {
    // puts text at position x, y
    for (int i = 0; i < length; i++) {
        screenBuffer[y][x + i] = text[i];
    }
}

int start_menu() {
    // menu to choose difficulty
    int choice = 0;

    char *menuItems[] = {
        "easy   [X]",
        "medium [ ]",
        "hard   [ ]"
    };

    char *title = "choose a difficulty and press enter to start";
    int titleLength = strlen(title);
    set_text((SCREENWIDTH - titleLength) / 2, SCREENHEIGHT / 2 - 1, title, titleLength);

    for (int i = 0; i < 3; i++) {
        set_text((SCREENWIDTH - 10) / 2, SCREENHEIGHT / 2 + i, menuItems[i], 10);
    }

    update_screen();

    HANDLE inputHandle = GetStdHandle(STD_INPUT_HANDLE);
    INPUT_RECORD inputBuffer;
    DWORD numEvents;

    while (1) {

        ReadConsoleInput(inputHandle, &inputBuffer, 1, &numEvents);

        if (inputBuffer.EventType == KEY_EVENT) {

            KEY_EVENT_RECORD keyEvent = inputBuffer.Event.KeyEvent;

            if (keyEvent.bKeyDown) { // key pressed


                if (keyEvent.wVirtualKeyCode == VK_UP) { // arrow up

                    set_text((SCREENWIDTH - 10) / 2 + 8, SCREENHEIGHT / 2 + choice, " ", 1);
                    choice = (choice - 1 + 3) % 3;
                    set_text((SCREENWIDTH - 10) / 2 + 8, SCREENHEIGHT / 2 + choice, "X", 1);

                } else if (keyEvent.wVirtualKeyCode == VK_DOWN) { // arrow down

                    set_text((SCREENWIDTH - 10) / 2 + 8, SCREENHEIGHT / 2 + choice, " ", 1);
                    choice = (choice + 1) % 3;
                    set_text((SCREENWIDTH - 10) / 2 + 8, SCREENHEIGHT / 2 + choice, "X", 1);

                } else if (keyEvent.wVirtualKeyCode == VK_RETURN) { // enter
                    return choice;
                }

                update_screen();
            } 
        }
    }

    CloseHandle(inputHandle);
}

void print_heading(int difficulty) {

    if (difficulty == 0) {
        set_text((SCREENWIDTH - 30) / 2, 1, "minesweeper - easy - ten mines", 30);
    } else if (difficulty == 1) {
        set_text((SCREENWIDTH - 35) / 2, 1, "minesweeper - medium - fourty mines", 35);
    } else if (difficulty == 2) {
        set_text((SCREENWIDTH - 37) / 2, 1, "minesweeper - hard - ninetynine mines", 37);

    }
    set_text((SCREENWIDTH - 23) / 2, 2, "F -> flag | R -> reveal", 23);
    set_text((SCREENWIDTH - 44) / 2, 3, "use the arrow keys to move the cursor around", 44);

    update_screen();
}

int **board;
int **boardRevealed;

int numMines;
int boardWidth;
int boardHeight;
int boardOffsetX;
int boardOffsetY;
int cursorX = 0;
int cursorY = 0;

void init_board(int d) {

    if (d == 0) {
        boardWidth = 8;
        boardHeight = 8;
        numMines = 10;
    } else if (d == 1) {
        boardWidth = 16;
        boardHeight = 16;
        numMines = 40;
    } else if (d == 2) {
        boardWidth = 30;
        boardHeight = 16;
        numMines = 99;
    }

    boardOffsetX = (SCREENWIDTH - boardWidth * 4) / 2;
    boardOffsetY = (SCREENHEIGHT - boardHeight * 2) / 2;

    board = malloc(sizeof(int *) * boardHeight);
    boardRevealed = malloc(sizeof(int *) * boardHeight);

    if (board == NULL || boardRevealed == NULL) {
        printf("failed to allocate %d bytes for board!\n", sizeof(int *) * boardHeight);
        exit(1);
    }

    for (int i = 0; i < boardHeight; i++) {
        board[i] = malloc(sizeof(int) * boardWidth);
        boardRevealed[i] = malloc(sizeof(int) * boardWidth);
        if (board[i] == NULL || boardRevealed[i] == NULL) {
            printf("failed to allocate %d bytes for board!\n", sizeof(int) * boardWidth);
            exit(1);
        }
    }

    for (int y = 0; y < boardHeight; y++) {
        for (int x = 0; x < boardWidth; x++) {
            board[y][x] = 0;
            boardRevealed[y][x] = 0;
        }
    }

    int n = numMines;
    while (n > 0) {
        int x = rand() % boardWidth;
        int y = rand() % boardHeight;
        if (board[y][x] != MINE) {
            board[y][x] = MINE;
            n--;
        }
    }

    // add numbers around mines
    for (int y = 0; y < boardHeight; y++) {
        for (int x = 0; x < boardWidth; x++) {
            if (board[y][x] == MINE) {
                if (y > 0 && x > 0 &&                               board[y - 1][x - 1] != MINE) board[y - 1][x - 1]++;
                if (y > 0 &&                                        board[y - 1][x    ] != MINE) board[y - 1][x    ]++;
                if (y > 0 && x < boardWidth - 1 &&                  board[y - 1][x + 1] != MINE) board[y - 1][x + 1]++;
                if (x > 0 &&                                        board[y    ][x - 1] != MINE) board[y    ][x - 1]++;
                if (x < boardWidth - 1 &&                           board[y    ][x + 1] != MINE) board[y    ][x + 1]++;
                if (y < boardHeight - 1 && x > 0 &&                 board[y + 1][x - 1] != MINE) board[y + 1][x - 1]++;
                if (y < boardHeight - 1 &&                          board[y + 1][x    ] != MINE) board[y + 1][x    ]++;
                if (y < boardHeight - 1 && x < boardWidth - 1 &&    board[y + 1][x + 1] != MINE) board[y + 1][x + 1]++;
            }
        }
    }
}

void free_board() {
    for (int i = 0; i < boardHeight; i++) {
        free(board[i]);
    }
    free(board);
}

void print_board() {

    for (int y = 0; y < boardHeight; y++) {
        for (int x = 0; x < boardWidth * 4 + 1; x++) {
            if (x % 4 == 0) {
                screenBuffer[boardOffsetY + y*2][x + boardOffsetX] = '+';
            } else {
                screenBuffer[boardOffsetY + y*2][x + boardOffsetX] = '-';
            }
        }
        for (int j = 0; j < boardWidth + 1; j++) {
            screenBuffer[boardOffsetY + 1 + y*2][j*4 + boardOffsetX] = '|';
        }
    }

    for (int x = 0; x < boardWidth * 4 + 1; x++) {
        if (x % 4 == 0) {
            screenBuffer[boardOffsetY + boardHeight*2][x + boardOffsetX] = '+';
        } else {
            screenBuffer[boardOffsetY + boardHeight*2][x + boardOffsetX] = '-';
        }
    }

    for (int y = 0; y < boardHeight; y++) {
        
        for (int x = 0; x < boardWidth; x++) {

            if (boardRevealed[y][x] == 1) {
                if (board[y][x] == MINE) {
                    screenBuffer[boardOffsetY + 1 + y*2][2 + x*4 + boardOffsetX] = '*';
                } else if (board[y][x] == 0) {
                    screenBuffer[boardOffsetY + 1 + y*2][2 + x*4 + boardOffsetX] = ' ';
                } else {
                    screenBuffer[boardOffsetY + 1 + y*2][2 + x*4 + boardOffsetX] = board[y][x] + '0';
                }
            } else if (boardRevealed[y][x] == FLAG) {
                screenBuffer[boardOffsetY + 1 + y*2][2 + x*4 + boardOffsetX] = '?';
            } else {
                screenBuffer[boardOffsetY + 1 + y*2][2 + x*4 + boardOffsetX] = '#';
            }

        }
    }

    screenBuffer[boardOffsetY + 1 + cursorY*2][1 + cursorX*4 + boardOffsetX] = '[';
    screenBuffer[boardOffsetY + 1 + cursorY*2][3 + cursorX*4 + boardOffsetX] = ']';
}

void clear_neighbors(int x, int y) {
    
    if (board[y][x] == 0) {
        boardRevealed[y][x] = 1;
        if (y > 0 && x > 0 &&                               boardRevealed[y - 1][x - 1] == 0) clear_neighbors(x - 1, y - 1);
        if (y > 0 &&                                        boardRevealed[y - 1][x    ] == 0) clear_neighbors(x    , y - 1);
        if (y > 0 && x < boardWidth - 1 &&                  boardRevealed[y - 1][x + 1] == 0) clear_neighbors(x + 1, y - 1);
        if (x > 0 &&                                        boardRevealed[y    ][x - 1] == 0) clear_neighbors(x - 1, y    );
        if (x < boardWidth - 1 &&                           boardRevealed[y    ][x + 1] == 0) clear_neighbors(x + 1, y    );
        if (y < boardHeight - 1 && x > 0 &&                 boardRevealed[y + 1][x - 1] == 0) clear_neighbors(x - 1, y + 1);
        if (y < boardHeight - 1 &&                          boardRevealed[y + 1][x    ] == 0) clear_neighbors(x,     y + 1);
        if (y < boardHeight - 1 && x < boardWidth - 1 &&    boardRevealed[y + 1][x + 1] == 0) clear_neighbors(x + 1, y + 1);
    } else {
        boardRevealed[y][x] = 1;
    }
}

void get_input(int *lost) {

    HANDLE inputHandle = GetStdHandle(STD_INPUT_HANDLE);
    INPUT_RECORD inputBuffer;
    DWORD numEvents;

    while (1) {
        ReadConsoleInput(inputHandle, &inputBuffer, 1, &numEvents);

        if (inputBuffer.EventType == KEY_EVENT) {

            KEY_EVENT_RECORD keyEvent = inputBuffer.Event.KeyEvent;
            if (keyEvent.bKeyDown) {
                if (keyEvent.wVirtualKeyCode == VK_UP && cursorY > 0) {
                    screenBuffer[boardOffsetY + 1 + cursorY*2][1 + cursorX*4 + boardOffsetX] = ' ';
                    screenBuffer[boardOffsetY + 1 + cursorY*2][3 + cursorX*4 + boardOffsetX] = ' ';
                    cursorY--;
                } else if (keyEvent.wVirtualKeyCode == VK_DOWN && cursorY < boardHeight - 1) {
                    screenBuffer[boardOffsetY + 1 + cursorY*2][1 + cursorX*4 + boardOffsetX] = ' ';
                    screenBuffer[boardOffsetY + 1 + cursorY*2][3 + cursorX*4 + boardOffsetX] = ' ';
                    cursorY++;
                } else if (keyEvent.wVirtualKeyCode == VK_LEFT && cursorX > 0) {
                    screenBuffer[boardOffsetY + 1 + cursorY*2][1 + cursorX*4 + boardOffsetX] = ' ';
                    screenBuffer[boardOffsetY + 1 + cursorY*2][3 + cursorX*4 + boardOffsetX] = ' ';
                    cursorX--;
                } else if (keyEvent.wVirtualKeyCode == VK_RIGHT && cursorX < boardWidth - 1) {
                    screenBuffer[boardOffsetY + 1 + cursorY*2][1 + cursorX*4 + boardOffsetX] = ' ';
                    screenBuffer[boardOffsetY + 1 + cursorY*2][3 + cursorX*4 + boardOffsetX] = ' ';
                    cursorX++;
                } else if (keyEvent.wVirtualKeyCode == 0x52) { // R
                    if (board[cursorY][cursorX] == MINE) {
                        *lost = 1;
                    }
                    clear_neighbors(cursorX, cursorY);
                } else if (keyEvent.wVirtualKeyCode == 0x46) { // F
                    if (boardRevealed[cursorY][cursorX] == 0) {
                        boardRevealed[cursorY][cursorX] = FLAG;
                    } else if (boardRevealed[cursorY][cursorX] == FLAG) {
                        boardRevealed[cursorY][cursorX] = 0;
                    }
                }
                return;
            } 
        }
    }
    CloseHandle(inputHandle);
}

void check_game_state(int *won) {

    *won = 1;

    for (int y = 0; y < boardHeight; y++) {
        for (int x = 0; x < boardWidth; x++) {

            if (board[y][x] != MINE && !boardRevealed[y][x]) {
                *won = 0;
                return;
            }

        }
    }
}

void lose_screen() {

    char *text[] = {
        "                                     >=>                              ",                              
        "                                     >=>                              ",                              
        ">=>   >=>    >=>     >=>  >=>        >=>    >=>      >===>    >==>    ",
        " >=> >=>   >=>  >=>  >=>  >=>        >=>  >=>  >=>  >=>     >>   >=>  ",
        "   >==>   >=>    >=> >=>  >=>        >=> >=>    >=>   >==>  >>===>>=> ",
        "    >=>    >=>  >=>  >=>  >=>        >=>  >=>  >=>      >=> >>        ",
        "   >=>       >=>       >==>=>       >==>    >=>     >=> >=>  >====>   ",
        " >=>                                                                  ",
        "hit enter to view the board...                                        "
    };
    
    for (int i = 0; i < 9; i++) {
        set_text((SCREENWIDTH - 70) / 2, SCREENHEIGHT / 2 - 4 + i, text[i], 70);
    }

    update_screen();

    getchar();
    clear_screen();

    for (int y = 0; y < boardHeight; y++) {
        for (int x = 0; x < boardWidth; x++) {
            boardRevealed[y][x] = 1;
        }
    }

    print_board();
    update_screen();
}

void win_screen(clock_t start) {

    char *text[] = {
        "                                                   /$$          ",
        "                                                  |__/          ",
        " /$$   /$$  /$$$$$$  /$$   /$$       /$$  /$$  /$$ /$$ /$$$$$$$ ",
        "| $$  | $$ /$$__  $$| $$  | $$      | $$ | $$ | $$| $$| $$__  $$",
        "| $$  | $$| $$  \\ $$| $$  | $$      | $$ | $$ | $$| $$| $$  \\ $$",
        "| $$  | $$| $$  | $$| $$  | $$      | $$ | $$ | $$| $$| $$  | $$",
        "|  $$$$$$$|  $$$$$$/|  $$$$$$/      |  $$$$$/$$$$/| $$| $$  | $$",
        " \\____  $$ \\______/  \\______/        \\_____/\\___/ |__/|__/  |__/",
        " /$$  | $$                                                      ",
        "|  $$$$$$/                                                      ",
        " \\______/                                                       ",
        "hit enter to view the board...                                  "
    };

    for (int i = 0; i < 12; i++) {
        set_text((SCREENWIDTH - 64) / 2, SCREENHEIGHT / 2 - 5 + i, text[i], 64);
    }

    update_screen();

    getchar();
    clear_screen();

    for (int y = 0; y < boardHeight; y++) {
        for (int x = 0; x < boardWidth; x++) {
            boardRevealed[y][x] = 1;
        }
    }

    print_board();
    update_screen();
    
    COORD endPosition = {0, SCREENHEIGHT};
    SetConsoleCursorPosition(consoleHandle, endPosition);

    printf("\ntime: %.2fs", (float)(clock() - start) / 1000);
}

void game_loop() {

    int lost = 0;
    int won = 0;
    clock_t start = clock();

    while (!lost && !won) {

        print_board(start);
        update_screen();
        get_input(&lost);
        check_game_state(&won);
    }

    clear_screen();

    if (won) {
        win_screen(start);
    } else {
        lose_screen();
    }
}

int main() {

    consoleHandle = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(consoleHandle, &cursorInfo);
    cursorInfo.bVisible = FALSE;
    SetConsoleCursorInfo(consoleHandle, &cursorInfo);

    srand(time(NULL));
    printf("\nminesweeper clone by kolmus\npress any key to start\nto quit press ctr+c\n");
    getchar();


    init_console();
    update_screen();

    int difficulty = start_menu();

    clear_screen();
    print_heading(difficulty);

    init_board(difficulty);
    game_loop();
    free_board();

    cursorInfo.bVisible = TRUE;
    SetConsoleCursorInfo(consoleHandle, &cursorInfo);
    CloseHandle(consoleHandle);

    return 0;
}
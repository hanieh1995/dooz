import { ShadowedElement } from "$/ShadowedElement";
import html from "./GamePage.html?raw";
import css from "./GamePage.css?raw";
import { WinResult } from "$/WinResult";
import { P1, P2 } from "$/players";
import { checkBoard } from "$/check-board";
import { Board } from "./components/board/Board";

const INITIAL_BOARD = Array(3).fill(null).map(() => Array(3).fill(null));

export class GamePage extends ShadowedElement {
    private boardData: any[][] = INITIAL_BOARD;
    private result: WinResult | null = null;
    private currentPlayer: string = Math.round(Math.random()) ? P1 : P2;
    private board: Board;

    constructor() {
        super(html, css);

        this.board = this.shadowRoot!.querySelector('.body')!;
        this.board?.addEventListener('cell-click', (e: any) => {
            const { i, j } = e.detail;
            this.handleClick(i, j);
        })
    }

    connectedCallback() {

    }

    private handleClick(i: number, j: number) {
        console.log(i, j);
        if (this.boardData[i][j] || this.result) return;

        this.boardData[i][j] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === P1 ? P2 : P1;

        this.board.data = { i, j, player: (this.boardData[i][j]).toLowerCase() };

        this.checkWinner();
    };

    private checkWinner() {
        const winResult = checkBoard(this.boardData);
        if (!winResult) return;

        this.result = winResult;
        // winResult.line.forEach((cell) => {
        //     this.boardData[cell[0]][cell[1]] = "🤩";
        // });
    };
}
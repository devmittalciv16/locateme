import React, {useState} from 'react'

import { Row, Col, Button } from "reactstrap"
// import { Button } from "bootstrap";




const Board = () => {


    class LinkedListNode {
        constructor(val) {
            this.value = val;
            this.next = null;
        }
    }

    class SinglyLinkedList {
        constructor(val) {

            const node = new LinkedListNode(val);
            this.head = node;
            // this.tail = node;

        }
    }

    const [board, setBoard] = useState(Createboard());
    const [snakeCell, setSnakeCell] = useState(new Set([55]));
    const [foodCell, setFoodCell] = useState({ '36': 1 });
    const [posionCell, setPoisonCell] = useState({ '37': 1 });
    const [snake, setSnake] = useState(new SinglyLinkedList(55));





    function AddSnakeCell(cellNumber) {
        setBoard();
        var temp = new Set(snakeCell);
        temp.add(cellNumber);
        // temp.delete(snake.tail.value);

        console.log(temp)

        setSnakeCell(temp);


    }

    function cellType(cellValue) {
        let temp = snakeCell.has(cellValue) ? "snake-cell" : "";
        // console.log(String(cellValue) + " " + temp);
        return temp;

    }




    const [rowCol, setRowCol] = useState(createRowCol());

    function createRowCol() {
        var temp = {};
        let counter = 1;
        for (let i = 1; i <= 12; i++) {

            for (let j = 1; j <= 14; j++) {

                temp[counter] = { "row": i, "col": j };
                counter++;
            }

        }

        return (temp);



    }

    function Createboard() {


        let board = [];
        let counter = 1;
        for (let i = 0; i < 12; i++) {
            let rowOfBoard = [];
            for (let j = 0; j < 14; j++) {
                rowOfBoard.push(counter);

                counter++;
            }
            board.push(rowOfBoard);
        }


        return board;

    }

    const [direction, setDirection] = useState({ "37": [-1, 0], "38": [0, -1], "39": [1, 0], "40": [0, 1] });

    function nextHeadHandler(row, col, dir) {

        let nextCol = col + direction[String(dir)][0];
        let nextRow = row + direction[String(dir)][1];
        let isValid = false;

        if (nextCol >= 1 && nextCol <= 14 && nextRow >= 1 && nextRow <= 12) {
            isValid = true;
            return { nextRow, nextCol, isValid };
        }
        return { nextRow, nextCol, isValid };


    }



    window.addEventListener("keydown", (e) => {

        const keyNumber = e.keyCode;
        const validKey = String(keyNumber) in direction ? true : false;

        if (validKey) {
            var currHeadValue = snake.head.value;
            var currHeadRow = rowCol[String(currHeadValue)].row;
            var currHeadCol = rowCol[String(currHeadValue)].col;

            var { nextRow, nextCol, isValid } = nextHeadHandler(currHeadRow, currHeadCol, keyNumber);
            if (isValid) {


                const nextHead = new LinkedListNode(board[nextRow - 1][nextCol - 1]);
                var currHead = snake.head;
                nextHead.next = currHead;
                snake.head = nextHead;

                // var ll = snake;
                // var currHead = ll.head;
                // nextHead.next = currHead;
                // ll.head = nextHead;
                // setSnake(ll);

                // temp.head = node;
                // temp.tail = snake.tail;
                // setSnake(temp);
                // console.log(snake.head.value);

                console.log(snake.head.value)
                AddSnakeCell(snake.head.value);




            }

            // console.log(snakeCell)

            // console.log(nextRow + " " + nextCol + " " + isValid);



        }



    })


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Button onClick={AddSnakeCell}>hasv</Button>

            <div className={"whole_board"} >

                {console.log(snakeCell)}


                {board.map((row, rowIndex) => {
                    return (
                        <Row className="board_row">
                            { row.map((col, colIn) => {
                                return (

                                    <Col key={col} className={cellType(col) + " " + "cell-design"}  >

                                        {String(col) in foodCell ? <i fluid style={{ color: "red" }} class="fas fa-apple-alt fa-2x"></i> : String(col) in posionCell ? <i style={{ color: "#cf10cf" }} class="fas fa-bomb fa-2x"></i> : ""}
                                    </Col>


                                );

                            })}
                        </Row>

                    );
                })}


            </div>
        </div >
    )
}

export default Board
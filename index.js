// const { forEach } = require("lodash");
const element = document.querySelectorAll(".board")
for (var i=0; i< 64; i++){

    var row_num = i%8 + 1;
    var col_num = parseInt(i/8) + 1;
    var file_name = "";

    switch(row_num) {
        case 1:
            file_name = 'h'
            break
        case 2:
            file_name = 'g'
            break
        case 3:
            file_name = 'f'
            break
        case 4:
            file_name = 'e'
            break
        case 5:
            file_name = 'd'
            break
        case 6:
            file_name = 'c'
            break
        case 7:
            file_name = 'b'
            break
        case 8:
            file_name = 'a'
            break
    } 

    // console.log(row_num, col_num, file_name, file_name + col_num)

    // var element = document.getElementById("mainChessBoard").appendChild(document.createElement("div"));
    // element.className = "board"
    // element.style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? 'white' : '#ababab';   
    
    // insert piece container
    var pieceContainer = element[i].appendChild(document.createElement("div"))
    pieceContainer.className = "pieceHolder"
    pieceContainer.setAttribute("data-piece", "none")
    pieceContainer.setAttribute("data-sqname", file_name + col_num)
    pieceContainer.setAttribute("draggable", "true")
}

function start_position() {
    const allsquares = Array.from(document.querySelectorAll(".pieceHolder"))
    var piece_name = "none";
    allsquares.forEach( sq => {
        
        if ((sq.getAttributeNode('data-sqname').value == "c1") | (sq.getAttributeNode('data-sqname').value == "f1"))
        {
            sq.setAttribute(['data-piece'], 'WhiteBishop')
        }

        else if ((sq.getAttributeNode('data-sqname').value == "c8") | (sq.getAttributeNode('data-sqname').value == "f8"))
        {
            sq.setAttribute(['data-piece'], 'BlackBishop')
        }
        
        else if ((sq.getAttributeNode('data-sqname').value == "a1") | (sq.getAttributeNode('data-sqname').value == "h1"))
        {
            sq.setAttribute(['data-piece'], 'WhiteRook')
        }

        else if ((sq.getAttributeNode('data-sqname').value == "a8") | (sq.getAttributeNode('data-sqname').value == "h8"))
        {
            sq.setAttribute(['data-piece'], 'BlackRook')
        }

        else if ((sq.getAttributeNode('data-sqname').value == "g1") | (sq.getAttributeNode('data-sqname').value == "b1"))
        {
            sq.setAttribute(['data-piece'], 'WhiteKnight')
        }

        else if ((sq.getAttributeNode('data-sqname').value == "g8") | (sq.getAttributeNode('data-sqname').value == "b8"))
        {
            sq.setAttribute(['data-piece'], 'BlackKnight')
        }

        else if (sq.getAttributeNode('data-sqname').value == "d1") 
        {
            sq.setAttribute(['data-piece'], 'WhiteQueen')
        }

        else if (sq.getAttributeNode('data-sqname').value == "d8") 
        {
            sq.setAttribute(['data-piece'], 'BlackQueen')
        }

        else if (sq.getAttributeNode('data-sqname').value == "e1") 
        {
            sq.setAttribute(['data-piece'], 'WhiteKing')
        }

        else if (sq.getAttributeNode('data-sqname').value == "e8") 
        {
            sq.setAttribute(['data-piece'], 'BlackKing')
        }

        else if (sq.getAttributeNode('data-sqname').value[1] == "7") 
        {
            sq.setAttribute(['data-piece'], 'BlackPawn')
        }

        else if (sq.getAttributeNode('data-sqname').value[1] == "2") 
        {
            sq.setAttribute(['data-piece'], 'WhitePawn')
        }
    })
}

start_position()


const placeholders = document.querySelectorAll(".pieceHolder");
const boardsquares = document.querySelectorAll(".board");

// placeholders listeners
placeholders.forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
})

// loop through boardsquares
boardsquares.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', dragDrop);
})

// fill_element
var fill_element = ""
var moving_piece = " ";
var ending_sqname = " ";
var isemptysquare = false;


// drag functions
function dragStart() {
    this.classList.add('hold')
    console.log("drag start", this)
    fill_element = this;
    console.log("fill elem", fill_element)
    setTimeout( () => (this.className = 'invisible'), 0.1);
    moving_piece = this.getAttribute('data-piece');
}

function dragEnd() {
    console.log("drag end:", this)
    this.className = 'pieceHolder'
}

function dragOver(e) {
    // console.log("drag over")
    e.preventDefault()
}

function dragEnter(e) {
    // console.log("drag enter")
    e.preventDefault()
    var dragenter_attr = this.getAttribute('data-piece')
    // ending_sqname = this.getAttribute('data-sqname')
    console.log("esqn: ", this,  ending_sqname)
    // console.log("check empty", this.getAttribute('data-piece'))
    // console.log("check class", this.className)

    // isemptysquare 
    if ( (dragenter_attr == null) & (this.className == "board")) {
        isemptysquare = true;
    }
    else {
        isemptysquare = false;
    }

    this.classList.add('hovered')
    // console.log("drag enter:", this)
    // console.log("drag enter child:", this)
    
}

function dragLeave() {
    // console.log("drag leave")
    this.className = "board" 
}

function dragDrop(e) {
    // console.log("drag drop")
    this.className = "board";

    // find out which piece
    fill_element.className = 'pieceHolder'
    fill_element.setAttribute("data-piece", moving_piece)

    // fill_element.setAttribute("data-sqname", 'e4')
    fill_element.setAttribute("draggable", "true")

    // ending square
    // var ending_sq_element = document.querySelector("[data-sqname = ending_sqname]") 
    // console.log("endsqelem: ", ending_sqname, ending_sq_element)

    // append only if its an empty square
    if (isemptysquare) { 
        
        console.log("final: ", this)
        // this.children[0].remove();
        // this.children[0].setAttribute("data-piece", moving_piece)
        this.append(fill_element)
     };
}


const bfsAlgo = (maze, visited, path, start, end, n, m) => {
    let queue = [];
    let move_count = 0;
    let left_layer = 1;
    let next_layer = 0;
    let reached_end = false;
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, 1, -1];

    visited[start.x][start.y] = true;
    queue.push(start);


    while (!(queue.lenght === 0)) {
        let current = queue.shift();
        // console.log(current, current.x === end.x && current.y === end.y)

        if (current === undefined) { break; }
        if (current.x === end.x && current.y === end.y) {
            reached_end = true;
            break;
        }


        for (let i = 0; i < 4; ++i) {
            let xx = current.x + dx[i];
            let yy = current.y + dy[i];

            if (xx < 0 || yy < 0) { continue; }
            if (xx >= n || yy >= m) { continue; }
            if (visited[xx][yy] === true) { continue; }
            if (maze[xx][yy] === '#') { continue; }

            queue.push({ x: xx, y: yy });
            visited[xx][yy] = true;
            path[xx][yy] = current;
            ++next_layer;
        }
        --left_layer;

        if (left_layer === 0) {
            left_layer = next_layer;
            next_layer = 0;
            ++move_count;
        }
    }

    if (reached_end) {
        return move_count;
    }
    return -1;
}

const reconstructPath = (end, start, prev, n) => {
    let path = [];
    let i = 0;
    let at = end;
    path.push(at);

    for (let i = 0; i < n; ++i) {
        at = prev[at.x][at.y];
        path.push(at);
    }
    return path;
}


const Board = () => {
    const row = 5;
    const col = 5;
    let start = { x: 2, y: 1 };
    let end = { x: 2, y: 3 };

    const grid = [];
    const path = [];
    const visited = [];
    for (let i = 0; i < row; i++) {
        const currentRow = [];
        const currentRowPath = [];
        const currentRowVisited = [];
        for (let j = 0; j < col; j++) {
            currentRow.push('');
            currentRowPath.push('');
            currentRowVisited.push(false);
        }
        grid.push(currentRow);
        path.push(currentRowPath);
        visited.push(currentRowVisited);
    }

    grid[2][1] = 'E';
    grid[1][1] = '#';
    grid[1][2] = '#';
    grid[1][4] = '#';
    grid[2][2] = '#';
    grid[3][3] = '#';
    grid[4][1] = '#';
    grid[2][3] = 'S';

    let result = bfsAlgo(grid, visited, path, start, end, row, col);
    if (result !== -1) {
        let way = reconstructPath(end, start, path, result)
        console.log(way)
    }
}

Board();


export const Cell = function(Dimensions) {
  this.x    = 0
  this.y    = 0
  this.f    = 0
  this.g    = 0
  this.h    = 0
  this.cols  = Dimensions().width / 100
  this.rows  = Dimensions().height / 100
  this.neighbors  = []
  this.previous   = undefined
  this.isPath     = false
  this.isPathDirectionTurn = false
  this.tempPathString = ''
  this.obstacle = false
  this.showObstacle = false

  if((Math.floor(Math.random() * 100) + 1) < 22) {
    this.obstacle = true
    this.showObstacle = true
  }

  this.addNeighbors = function(grid) {
    let _x = this.x
    let _y = this.y

    this.addDefaultNeighbors(grid, _x, _y)
    // this.addDiagonalNeighbors(grid, _x, _y) <- TODO
  }

  this.addDefaultNeighbors = function(grid, _x, _y) {
    if(_x < this.cols - 1) {
      this.neighbors.push(grid[_x + 1][_y])
    }
    if(_x > 0) {
      this.neighbors.push(grid[_x - 1][_y])
    }
    if(_y < this.rows - 1) {
      this.neighbors.push(grid[_x][_y + 1])
    }
    if(_y > 0) {
      this.neighbors.push(grid[_x][_y -1])
    }
  }

  this.addDiagonalNeighbors = function(grid, _x, _y) {
    if(_x > 0 && _y > 0) {
      this.neighbors.push(grid[_x - 1][_y - 1])
    }
    if(_x < this.cols - 1 && _y > 0) {
      this.neighbors.push(grid[_x + 1][_y - 1])
    }
    if(_x > 0 && _y < this.rows - 1) {
      this.neighbors.push(grid[_x - 1][_y + 1])
    }
    if(_x < this.cols - 1 && _y > 0) {
      this.neighbors.push(grid[_x + 1][_y - 1])
    }
  }

  this.reset = function() {
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
    this.previous = undefined
    this.isPath = false
    this.isPathDirectionTurn = false
    this.tempPathString = ''
    // this.obstacle = false
  }
}

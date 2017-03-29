import { Grid } from '../../grid/Grid'
import * as TYPES from '../types/unitTypes'
let _grid = Grid.getInstance()

// TYPES
import { TankType } from '../tank/type'
import { SoldierType } from '../soldiers/type'

export const UnitUtils = function() {
  var instance = null

  function createUtils() {
    //___________________________________________________________________________
    function isPositionAvaliable(position, units) {
      let isAvailable = true
      if(_grid.suggestedPositionIsAnObstacleCell(position)) {
        return false
      }
      units.forEach((tank, index) => {
        if(tank.position.x === position.x && tank.position.y === position.y) {
          isAvailable = false
        }
      })

      return isAvailable
    }
    //___________________________________________________________________________
    function getRandomPosition(units) {
      let columns = _grid.getCols()
      let rows = _grid.getRows()
      return {
        x: Math.floor(Math.random() * columns),
        y: Math.floor(Math.random() * rows)
      }
    }
    //___________________________________________________________________________
    function getRandomPos(units) {
      let foundPosition = false
      let position = null
      let maxTries = _grid.getCols() * _grid.getRows()

      if(units.length === 0) {
        return getRandomPosition(units)
      }

      for(var i = 0; i < maxTries; i++) {
        position = getRandomPosition()
        // eslint-disable-next-line
        foundPosition = isPositionAvaliable(position, units)
        if(foundPosition) {
          break;
        }
      }
      return foundPosition ? position : undefined
    }
    //___________________________________________________________________________
    function getUnit(unitType, unitPosition, units) {
      console.log('unit utils', units)
      let unit = null
      switch (unitType) {
        case TYPES.TANK_TYPE:
          unit = getTankUnit(unitPosition, units)
          break;
        case TYPES.SOLDIER_TYPE:
          unit = getSoldierUnit(unitPosition, units)
          break;
        default:
          unit = getTankUnit(unitPosition, units)
      }
      return unit
    }
    //___________________________________________________________________________
    function getSoldierUnit(unitPosition, units) {
      let soldier = new SoldierType()
      // id
      soldier.setId(units.length)
      // position
      soldier.setPosition(unitPosition)
      // color
      let torso     = '#696e77'
      let shoulders = '#4e5e7a'
      let arms      = '#303c51'
      let head      = '#2a477c'
      let weapon    = '#73757a'
      let barrel    = '#73757a'
      soldier.setColors(torso, shoulders, arms, head, weapon, barrel)

      return soldier.getUnit()
    }
    //___________________________________________________________________________
    function getTankUnit(unitPosition, units) {
      let tank = new TankType()
      // id
      tank.setId(units.length)
      // position
      tank.setPosition(unitPosition)
      // color
      let baseColor   = units.length % 2 ? tank.baseBlue : tank.baseRed
      let cabinColor  = units.length % 2 ? tank.cabinBlue : tank.cabinRed
      let cannonColor = units.length % 2 ? tank.cannonBlue : tank.cannonRed
      tank.setColors(baseColor, cabinColor, cannonColor)

      return tank.getUnit()
    }
    //___________________________________________________________________________
    // PUBLIC
    //___________________________________________________________________________
    return {
      getRandomPos: getRandomPos,
      getUnit: getUnit,
      getTankUnit: getTankUnit
    }
  }

  return {
     getInstance: function() {
        if(!instance) {
           instance = createUtils();
        }
        return instance;
     }
  }
}()

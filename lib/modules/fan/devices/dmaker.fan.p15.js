const DmakerFanP11 = require('./dmaker.fan.p11.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class DmakerFanP15 extends DmakerFanP11 {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "dmaker.fan.p15";
  }

  getDeviceName() {
    return "Mi Smart Standing Fan Pro EU";
  }

  getDeviceMiotSpec() {
    return "http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:fan:0000A005:dmaker-p15:1";
  }


  /*----------========== INIT ==========----------*/


  /*----------========== CONFIG ==========----------*/


}

module.exports = DmakerFanP15;

let Service, Characteristic, Accessory, HapStatusError, HAPStatus;
const BaseAccessory = require('../../base/BaseAccessory.js');
const Constants = require('../../constants/Constants.js');
const DevTypes = require('../../constants/DevTypes.js');
const Properties = require('../../constants/Properties.js');


class CoffeeMachineAccessory extends BaseAccessory {
  constructor(name, miotDevice, uuid, config, api, logger) {
    super(name, miotDevice, uuid, config, api, logger);
  }


  /*----------========== SETUP ACCESSORY ==========----------*/

  initHapConstants() {
    Service = this.api.hap.Service;
    Characteristic = this.api.hap.Characteristic;
    Accessory = this.api.platformAccessory;
    HapStatusError = this.api.hap.HapStatusError;
    HAPStatus = this.api.hap.HAPStatus;
  }

  initConfigProperties(config) {
    this.actionButtons = this.getPropValue(config['actionButtons'], false);
  }

  getAccessoryType() {
    return DevTypes.COFFEE_MACHINE;
  }


  /*----------========== SETUP SERVICES ==========----------*/

  initAccessory() {
    return new Accessory(this.getName(), this.getUuid(), this.api.hap.Accessory.Categories.AIR_HEATER);
  }

  setupMainAccessoryService() {
    this.coffeMachineSwitchService = this.createStatefulSwitch(this.getName(), 'coffeMachineSwitchService', this.isCoffeMachineOn, this.setCoffeMachineOn);
    this.addAccessoryService(this.coffeMachineSwitchService);
  }

  setupAdditionalAccessoryServices() {
    if (this.actionButtons) this.prepareActionButtonServices(this.actionButtons);
  }


  /*----------========== CREATE ADDITIONAL SERVICES ==========----------*/



  /*----------========== HOMEBRIDGE STATE SETTERS/GETTERS ==========----------*/

  isCoffeMachineOn() {
    if (this.isMiotDeviceConnected()) {
      return this.getDevice().isHeating();
    }
    return false;
  }

  setCoffeMachineOn(state) {
    if (this.isMiotDeviceConnected()) {
      this.getDevice().setPowerOn(state);
    } else {
      throw new HapStatusError(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
    }
  }


  // ----- additional services


  /*----------========== STATUS ==========----------*/

  updateDeviceStatus() {
    if (this.coffeMachineSwitchService) this.coffeMachineSwitchService.getCharacteristic(Characteristic.On).updateValue(this.isCoffeMachineOn());

    super.updateDeviceStatus();
  }


  /*----------========== MULTI-SWITCH SERVICE HELPERS ==========----------*/


  /*----------========== GETTERS ==========----------*/


  /*----------========== HELPERS ==========----------*/


}


module.exports = CoffeeMachineAccessory;

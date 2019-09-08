"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webadmin_module_1 = require("./webadmin.module");
describe('AdminModule', function () {
    var adminModule;
    beforeEach(function () {
        adminModule = new webadmin_module_1.WebadminModule();
    });
    it('should create an instance', function () {
        expect(adminModule).toBeTruthy();
    });
});
//# sourceMappingURL=webadmin.module.spec.js.map
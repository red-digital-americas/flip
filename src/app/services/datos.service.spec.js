"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var datos_service_1 = require("./datos.service");
describe('DatosService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(datos_service_1.DatosServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=datos.service.spec.js.map
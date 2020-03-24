export class Validator {






    public static uuid = {
        3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };
    public static isUUID = (str): boolean => {
        var version = 'all';
        // this.assertString(str);
        var pattern = Validator.uuid[version];
        return pattern && pattern.test(str);
    }

    //    public  assertString =(input) => {
    //        var isString = typeof input === 'string' || input instanceof String;

    //        if (!isString) {
    //            var invalidType;

    //            if (input === null) {
    //                invalidType = 'null';
    //            } else {
    //                invalidType = this._typeof(input);

    //                if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
    //                    invalidType = input.constructor.name;
    //                } else {
    //                    invalidType = "a ".concat(invalidType);
    //                }
    //            }

    //            throw new TypeError("Expected string but received ".concat(invalidType, "."));
    //        }
    //    }

    //    private  _typeof = (obj)=> {
    //    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    //        this._typeof = function (obj) {
    //            return typeof obj;
    //        };
    //    } else {
    //        this._typeof = function (obj) {
    //            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    //        };
    //    }

    //    return this._typeof(obj);
    //}
}
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const App = () => {
    const [value, setValue] = (0, react_1.useState)('');
    const [items, setItems] = (0, react_1.useState)([]);
    const apiSend = () => {
        console.log('apiSend start');
        console.log('apiSend value:', value);
        axios_1.default
            .post("/add", {
            name: value,
            age: 666
        }).then((res) => {
            console.log('axios res:', res.data);
        }).catch((error) => console.log('axios error:', error));
    };
    const apiGetItems = () => {
        axios_1.default.get('/items').then((res) => {
            setItems(res.data);
            console.log('axios res:', res.data);
        }).catch((error) => console.log('axios error:', error));
    };
    return;
    react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Button, { onClick: apiGetItems }, "get items"),
            react_1.default.createElement("div", null, items.map((items) => {
                return react_1.default.createElement("div", null,
                    "name: ",
                    items.name);
            }))));
};
;
exports.default = App;

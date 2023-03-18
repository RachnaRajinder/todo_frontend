var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _todo_instances, _todo_backend_url, _todo_readJson, _todo_addToAray, _todo_removeFromArray;
import { Task } from "./Task.js";
class todo {
    constructor(backend_url) {
        _todo_instances.add(this);
        this.tasks = [];
        _todo_backend_url.set(this, '');
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _todo_backend_url, "f"))
                    .then(response => response.json())
                    .then((response) => {
                    __classPrivateFieldGet(this, _todo_instances, "m", _todo_readJson).call(this, response);
                    resolve(this.tasks);
                }, (error) => {
                    reject(error);
                });
            }));
        });
        this.addTask = (text) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const json = JSON.stringify({ description: text });
                fetch(__classPrivateFieldGet(this, _todo_backend_url, "f") + '/new', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                    .then(response => response.json())
                    .then(response => {
                    resolve(__classPrivateFieldGet(this, _todo_instances, "m", _todo_addToAray).call(this, response.id, text));
                }), (error) => {
                    reject(error);
                };
            }));
        });
        this.removeTask = (id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _todo_backend_url, "f") + '/delete/' + id, {
                    method: 'delete'
                })
                    .then(response => response.json())
                    .then(response => {
                    __classPrivateFieldGet(this, _todo_instances, "m", _todo_removeFromArray).call(this, id);
                    resolve(response.id);
                }, (error) => {
                    reject(error);
                });
            }));
        };
        __classPrivateFieldSet(this, _todo_backend_url, backend_url, "f");
    }
}
_todo_backend_url = new WeakMap(), _todo_instances = new WeakSet(), _todo_readJson = function _todo_readJson(taskAsJson) {
    taskAsJson.forEach((node) => {
        const task = new Task(node.id, node.description);
        this.tasks.push(task);
    });
}, _todo_addToAray = function _todo_addToAray(id, text) {
    const task = new Task(id, text);
    this.tasks.push(task);
    return task;
}, _todo_removeFromArray = function _todo_removeFromArray(id) {
    const arrayWithoutRemoved = this.tasks.filter(task => task.id !== id);
    this.tasks = arrayWithoutRemoved;
};
export { todo };

class ContextManager {
    store: Map<string, any>;

    constructor() {
        this.store = new Map();
    }

    get<T> (key: string): T {
        let value = this.store.get(key);
        if (!!!value) {
            throw new Error(`There is no such bean named ${key}`);
        }
        return value;
    }

    set<T> (key: string, value: T, changBean: boolean = false) {
        console.log(typeof value);
        if (!changBean && this.store.has(key)) {
            // 값이 있을 경우 changeBean이 true여야 가능하다.
            console.warn("context manager에 값이 이미 있는 경우, changeBean = true 파라미터가 필요합니다.");
            return;
        }
        this.store.set(key, value);
    }

}

const contextManager = new ContextManager();

export default contextManager;
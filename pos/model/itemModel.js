export default class ItemModel{
    constructor(item_code,name,unitPrice,qty) {
        this._item_code=item_code;
        this._name =name;
        this._unitPrice = unitPrice;
        this._qty = qty;

    }


    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }


}
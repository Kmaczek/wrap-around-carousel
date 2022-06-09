export class CarouselModel {
    title: string | undefined;
    color: string | undefined;

    constructor(init: Partial<CarouselModel>){
        Object.assign(this, init);
    }
}
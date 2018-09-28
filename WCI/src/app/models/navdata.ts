import { BaseModel } from './basemodel';

export class NavData extends BaseModel<NavData> {
    public title: string;
    public routeId: string;
}

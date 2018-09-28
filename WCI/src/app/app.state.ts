import { AlertRule } from './models/alertrule'
import { ManageIntegrationItem } from './models/manage-integration-item'
import { InstrumentItem } from './models/instrument-item'
import { IntegrationEquipmentMap } from './models/integration-equipment-map'
import { AutoFilterEvent } from './models/autofilterevent'
import { SampleRule } from './models/samplerule'
import { Zone } from './models/zone'
import { EquipmentModel } from './models/equipment-model'
import { Alert } from './models/alert';
import { NoteTemplate } from './models/notetemplate';

export interface AppState {
    readonly alertrule: AlertRule[];
    readonly manageIntegrationItem: ManageIntegrationItem[];
    readonly instrumentItem: InstrumentItem[];
    readonly integrationEquipmentMaps: IntegrationEquipmentMap[];
    readonly autofilterevents: AutoFilterEvent[];
    readonly samplerule: SampleRule[];
    readonly zone: Zone[];
    readonly equipmentModel: EquipmentModel[];
    readonly unresolvedalert: Alert[];
    readonly resolvedalert: Alert[];
    readonly noteTemplate: NoteTemplate[];
}

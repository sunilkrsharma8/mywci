import { AlertEscalation } from "./alertescalation";
import { AlertType } from "./alerttype";
import { Note } from "./note";

export class Alert{
    Id: number;
    Version: number;
    AcknowledgedBy: string;
    AcknowledgedTime: string;
    AlertEscalation: AlertEscalation;
    AlertType: AlertType;
    AutoCloseable: boolean;
    AutoFilter: boolean;
    EquipmentId: number;
    Escalation: number;
    ExternalAlert: number;
    HasBeenEscalated: boolean;
    ItemId: string;
    Message: string;
    Notes: Note[];
    ResolvedBy: string;
    ResolvedTime: string;
    RuleId: number;
    Severity: number;
    SourceId: number;
    SourceType: number;
    Status: number;
    Tag: number;
    Time: string;
    Type: number;
    UserAckable: boolean;
    UserCloseable: boolean;
}
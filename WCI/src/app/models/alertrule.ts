export class AlertRule{
    public __type: string;
    public Id: number;
    public Version : number;
    public Category: number;
    public Type: number;
    public Name: string;
    public Enabled: boolean;
    public Instruments: Array<number>;
    public AckThreshold: string;
    public ResolveThreshold: string;
    public NotificationEmails: Array<string>;
    public EscalationEmails: Array<string>;
    public EmailOnEscalationResolution: boolean;
}

export class InventoryLevelRule extends AlertRule{
    public ItemNames: Array<string> 
    public FullLevel: number;
    public WarningLevel: number;
    public CriticalLevel: number;
}

export class ConsumableInventoryLevelRule extends InventoryLevelRule{

}

export class WasteInventoryLevelRule extends InventoryLevelRule{
    
}

export class ReagentInventoryLevelRule extends InventoryLevelRule{
    
}

export class AncillaryReagentInventoryLevelRule extends InventoryLevelRule{
    
}

export class InventoryExpirationRule extends AlertRule{
    public ItemNames: Array<string>;
    public EnableCriticalThreshold: boolean;
    public WarningThreshold: string;
    public EnableOBSCriticalThreshold: boolean
    public OBSWarningThreshold: string;
}

export class InventoryCalibrationExpirationRule extends InventoryExpirationRule{}

export class AlertRuleRecurrence{
    public Id: number
    public Version: number;
    public  RecurrenceType: number;
    public BaseTime: string;
    public Interval: number;
    public DayOfMonth: number;
    public DaysOfWeekMask: number;
    public Instance: number;
    public MonthOfYear: number;

}

export class UserDefinedRule  extends AlertRule{
    public Description: string
    public AlertTime: string;
    public Severity: number;
    public Recurrence: AlertRuleRecurrence;

}

export class CommunicationRule extends AlertRule{}

export class SystemUpdateRule extends AlertRule {}


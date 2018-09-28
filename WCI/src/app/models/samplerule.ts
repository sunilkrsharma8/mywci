export class SampleRule {
    public __type: string;
    public AtRiskDuration: string;
    public AtRiskEvent: string;
    public DurationScale: number;
    public Enabled: boolean;
    public EndEvent: string;
    public Id: number;
    public IsDeletable: boolean;
    public LocationNames: Array<string>;
    public Name: string;
    public NotificationEmails: Array<string>;
    public OverdueDuration: number;
    public StartEvent: string;
    public TestNames: Array<string>;
    public TestPriorityMask: number;
    public TestStateMask: number;
    public Type: number;
    public Version: number;
    public ZoneIDs: Array<string>;
}

export class TurnaroundTimeRule extends SampleRule {

}
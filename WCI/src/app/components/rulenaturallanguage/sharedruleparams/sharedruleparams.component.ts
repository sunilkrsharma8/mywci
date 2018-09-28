import { Component, OnInit, Input, Output, AfterViewInit, OnChanges, EventEmitter } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";

@Component({
  selector: 'app-sharedruleparams',
  templateUrl: './sharedruleparams.component.html',
  styleUrls: ['./sharedruleparams.component.css']
})
export class SharedruleparamsComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  notificationemailText: string = "on one";
  escalationAckText: string = "never; this escalation option is currently disabled";
  escalationresolveText: string = "never; this escalation option is currently disabled";
  escalationEmailText: string = "no one";
  resolutionEmailText: string = "do not send an email notification";
  titleText: string = "unspecified title";
  enabledText: string = "Enabled";
  isShowAlertModal: boolean = false;
  isShowEscalationEmailModal: boolean = false;
  isShowNotificationEmailModal: boolean = false;
  isShowTitleModal: boolean = false;
  isShowEnableModal: boolean = false;
  configurabletext1: string = "if expiration is within";
  configurabletext2: string = "hour(s)";
  configurabletext3: string = "";
  escalationAckThreshold: number;
  escalationResThreshold: number;
  notificationEmails: Array<string> = [];
  escalationEmails: Array<string> = [];
  isEmailOnEscResolution: boolean = false;
  alertType: string;
  ruleEnabled: boolean;
  isShowAlertInputText: boolean = false;
  disableEscalationEmail: boolean = true;
  disableResolutionEmail: boolean = true;
  @Input() ruleData;

  constructor() { }

  ngOnInit() {
  }

   ngOnChanges(){
    this.refreshRuleData();
  }

  private refreshRuleData()
  {
    if(this.ruleData){
      if(this.ruleData.hasOwnProperty("Name") && !this.isNewRule){
        this.titleText = this.ruleData.Name;
      }else{
        this.titleText = "unspecified title";
      }

      if(this.ruleData.hasOwnProperty("Enabled")){
        this.ruleEnabled = this.ruleData.Enabled;
        this.enabledText =  this.ruleEnabled ? "Enabled" : "Disabled";
      }

      if(this.ruleData.hasOwnProperty("AckThreshold")){

        this.escalationAckThreshold = HelperFunctions.transformtoSeconds(this.ruleData.AckThreshold);
        let seconds = this.escalationAckThreshold;
        
        if(this.escalationAckThreshold/60 != 0){
          this.disableEscalationEmail = false;
          this.escalationAckText =  "within " + this.escalationAckThreshold/60 + " minute(s)";
        }else{
          this.escalationAckText =  "never; this escalation option is currently disabled";  
        }
      
      }else{
        this.escalationAckText =  "never; this escalation option is currently disabled";  
      }

      if(this.ruleData.hasOwnProperty("ResolveThreshold")){

        this.escalationResThreshold = HelperFunctions.transformtoSeconds(this.ruleData.ResolveThreshold);
        let seconds = this.escalationResThreshold;
        
        if(this.escalationResThreshold/60 != 0){
          this.disableEscalationEmail = false;
          this.escalationresolveText =  "within " + this.escalationResThreshold/60 + " minute(s)";
        }else{
          this.escalationresolveText =  "never; this escalation option is currently disabled";  
        }
      
      }else{
        this.escalationresolveText =  "never; this escalation option is currently disabled";  
      }

      if(this.ruleData.hasOwnProperty("NotificationEmails")){
        //this.emailsList = this.ruleData.NotificationEmails;
        if(this.ruleData["NotificationEmails"].length > 0){
          this.notificationemailText = "";
          <Array<string>>this.ruleData["NotificationEmails"].forEach(element =>{
            this.notificationemailText += ", " + element; 
          });
          this.notificationemailText = this.notificationemailText.slice(1);
        }
        else{
          this.notificationemailText = "no one";
        }
      }

      if(this.ruleData.hasOwnProperty("EscalationEmails")){
        //this.emailsList = this.ruleData.NotificationEmails;
        if(this.ruleData["EscalationEmails"].length > 0){
          this.escalationEmailText = "";
          <Array<string>>this.ruleData["EscalationEmails"].forEach(element =>{
            this.escalationEmailText += ", " + element; 
            this.escalationEmails.push(element);
          });
          this.escalationEmailText = this.escalationEmailText.slice(1);
          this.disableResolutionEmail = false;
        }else{
          this.escalationEmailText = "no one";
        }
      }else{
        this.escalationEmailText = "no one";
      }

      if(this.ruleData.hasOwnProperty("EmailOnEscalationResolution")){
        //this.emailsList = this.ruleData.NotificationEmails;
        if(this.ruleData["EmailOnEscalationResolution"]){
          this.resolutionEmailText = "send an email notification to the escalation notification recipients";
        }else{
          this.resolutionEmailText = "do not send an email notification";
        }
      }else{
        this.resolutionEmailText = "do not send an email notification";
      }
    }
  }
  public naturalLanguageTextConfigurator(handle: any){
    if(handle == "notificationemail"){
      this.isShowNotificationEmailModal = true;
    }else if(handle == "escalationemail"){
      this.isShowEscalationEmailModal = true;
    }else if(handle == "escalationAck"){
      this.alertType = "escalationAck";
      this.configurabletext1 = "Escalate the alert if not acknowledged within";
      this.configurabletext2 = "minute(s)";
      this.configurabletext3 = "Disable alert acknowledgment escalation";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    }else if(handle == "escalationresolve"){
      this.alertType = "escalationresolve";
      this.configurabletext1 = "Escalate the alert if not resolved within";
      this.configurabletext2 = "minute(s)";
      this.configurabletext3 = "Disable alert resolution escalation";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    }else if(handle == "resolutionemail"){
      this.alertType = "resolutionemail";
      this.configurabletext1 = "Send an email notification to the escalation notification recipients";
      this.configurabletext2 = "";
      this.configurabletext3 = "Do not send an email notification";
      this.isShowAlertInputText = false;
      this.isShowAlertModal = true;
    }else if(handle == "title"){
      this.isShowTitleModal = true;
    }else if(handle == "enabled"){
      this.isShowEnableModal = true;
    }
  }

  public updateAlerts(alert: any): void{
    if(alert.type == "escalationAck"){
      this.escalationAckThreshold = alert.value*60;
      if(this.escalationAckThreshold/60 != 0){
        this.disableEscalationEmail = false;
        this.escalationAckText =  "within " + this.escalationAckThreshold/60 + " minute(s)";
        this.disableEscalationEmail = false;
      }else{
        this.escalationAckText =  "never; this escalation option is currently disabled."; 
        if(this.escalationResThreshold == 0){ 
          this.disableEscalationEmail = true;
          this.updateEscalationEmail({selected: [], allemails: []});
        }
      }
    }else if(alert.type == "escalationresolve"){
      this.escalationResThreshold = alert.value*60;
      if(this.escalationResThreshold/60 != 0){
        this.disableEscalationEmail = false;
        this.escalationresolveText =  "within " + this.escalationResThreshold/60 + " minute(s)";
        this.disableEscalationEmail = false;
      }else{
        this.escalationresolveText =  "never; this escalation option is currently disabled.";  
        if(this.escalationAckThreshold == 0){
          this.disableEscalationEmail = true;
          this.updateEscalationEmail({selected: [], allemails: []});
        }
      }
    }else if(alert.type == "resolutionemail"){
      if(alert.value != "" || alert.value != 0){
        this.resolutionEmailText =  "send an email notification to the escalation notification recipients";
      }else{
        this.isEmailOnEscResolution = false;
        this.resolutionEmailText =  "do not send an email notification";  
      }
    }
    this.isShowAlertModal = false;
    this.onChange.emit({AckThreshold: this.escalationAckThreshold, ResolveThreshold: this.escalationResThreshold, EscalationEmails: this.escalationEmails, EmailOnEscalationResolution: this.isEmailOnEscResolution, NotificationEmails: this.escalationEmails, Name:this.titleText, Enabled:this.ruleEnabled});
  }

  public updateNotificationEmail(emails: Array<any>):void{
    if(emails["selected"].length > 0){
      this.notificationemailText = "";
      emails["selected"].forEach(element =>{
        this.notificationEmails.push(element);
        this.notificationemailText += ", " + element;
      });
      this.notificationemailText = this.notificationemailText.slice(1);
    }else{
      this.notificationEmails = [];
      this.notificationemailText = "no one";
    }
    this.emailsList = emails["allemails"];
    this.isShowNotificationEmailModal = false;
    this.onChange.emit({AckThreshold: this.escalationAckThreshold, ResolveThreshold: this.escalationResThreshold, EscalationEmails: this.escalationEmails, EmailOnEscalationResolution: this.isEmailOnEscResolution, NotificationEmails: this.notificationEmails, Name:this.titleText, Enabled:this.ruleEnabled});
  }

  public updateEscalationEmail(emails: any):void{
    if(emails["selected"].length > 0){
      this.escalationEmailText = "";
      emails["selected"].forEach(element =>{
        this.escalationEmails.push(element);
        this.escalationEmailText += ", " + element;
      });
      this.escalationEmailText = this.escalationEmailText.slice(1);
      this.disableResolutionEmail= false;
    }else{
      this.escalationEmails = [];
      this.escalationEmailText = "no one";
      this.disableResolutionEmail = true;
      this.resolutionEmailText = "do not send an email notification"
    }
    this.emailsList = emails["allemails"];
    this.isShowEscalationEmailModal = false;
    this.onChange.emit({AckThreshold: this.escalationAckThreshold, ResolveThreshold: this.escalationResThreshold, EscalationEmails: this.escalationEmails, EmailOnEscalationResolution: this.isEmailOnEscResolution, NotificationEmails: this.escalationEmails, Name:this.titleText, Enabled:this.ruleEnabled});
  }

    public updateTitle(title: any): void{
    this.titleText =  title.name;
    if(this.titleText == ""){
      this.titleText = "unspecified title";
    }
    this.isShowTitleModal = false;
    this.onChange.emit({AckThreshold: this.escalationAckThreshold, ResolveThreshold: this.escalationResThreshold, EscalationEmails: this.escalationEmails, EmailOnEscalationResolution: this.isEmailOnEscResolution, NotificationEmails: this.escalationEmails, Name:this.titleText, Enabled:this.ruleEnabled});
  }

  public updateRuleEnable(enabled: any): void{
    this.ruleEnabled = enabled.enabled;
    this.enabledText = this.ruleEnabled? "Enabled": "Disabled";
    this.isShowEnableModal =  false;
    this.onChange.emit({AckThreshold: this.escalationAckThreshold, ResolveThreshold: this.escalationResThreshold, EscalationEmails: this.escalationEmails, EmailOnEscalationResolution: this.isEmailOnEscResolution, NotificationEmails: this.escalationEmails, Name:this.titleText, Enabled:this.ruleEnabled});
  }

  public cancelRule(ruleData: any): void{
    this.ruleData = ruleData;
    this.refreshRuleData();
  }
}

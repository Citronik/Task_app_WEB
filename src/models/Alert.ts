enum AlertType {
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
  SUCCESS = "success"
}
export default AlertType

export class Alert
{
  id: Date = null;
  title: string = "";
  text: string = "";
  type: AlertType = null;

  constructor(data: Partial<Alert> = {}) {
    Object.assign(this, data);
  }

}


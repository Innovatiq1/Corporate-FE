
export class EmpRequest {
    id: number;
    reason: string;
    constructor(empRequest: EmpRequest) {
      {
        this.id = empRequest.id || this.getRandomID();
        this.reason = empRequest.reason || '';
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }
  
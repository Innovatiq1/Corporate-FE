import { formatDate } from '@angular/common';
export class Staff {
  id: number;
  img: string;
  name: string;
  email: string;
  date: string;
  address: string;
  mobile: string;
  role: string;
  salary:any
  data:any;
  joiningDate: any;
  constructor(staff: Staff) {
    {
      this.id = staff.id || this.getRandomID();
      this.img = staff.img || 'assets/images/user/user1.jpg';
      this.name = staff.name || '';
      this.role = staff.role || '';
      this.email = staff.email || '';
      this.salary = staff.salary || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.address = staff.address || '';
      this.mobile = staff.mobile || '';
      this.data = staff.data;
      this.joiningDate = staff.joiningDate || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}

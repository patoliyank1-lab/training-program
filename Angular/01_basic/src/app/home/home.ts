import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'form-comp',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './home.html',
    styleUrls: ['./home.css']

})

export  class HomePage {
  title = "my-angular-form-project";

  countryList: country[] = [
    new country('1', 'India'),
    new country('2', 'USA'),
    new country('3', 'England'),
  ];

  onSubmit(contactForm: NgForm) {
    // Your form submission logic here
    console.log('Form Submitted!', contactForm.value);
  }
}

export class country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

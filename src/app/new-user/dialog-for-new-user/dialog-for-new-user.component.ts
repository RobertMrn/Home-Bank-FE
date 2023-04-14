import {Component, OnInit} from '@angular/core';
import * as Tesseract from "tesseract.js";
import {FormBuilder} from "@angular/forms";
import {UserDetailsService} from "../../Services/user-details-service";

@Component({
  selector: 'app-dialog-for-new-user',
  templateUrl: './dialog-for-new-user.component.html',
  styleUrls: ['./dialog-for-new-user.component.css']
})
export class DialogForNewUserComponent implements OnInit {
  private fileReader = '';
  private allRecognizedText: string[] = [];
  private lineOfLastName: string[] = [];
  private lastName: string = '';
  private lineOfFirstName: string[] = [];
  private firstName: string = '';
  private lineOfAddress: string[] = [];
  private address: string = '';
  private lineOfTown: string[] = [];
  private town: string = '';
  private lineOfGender: string[] = [];
  private gender: string = '';
  private lineOfNationality: string[] = [];
  private nationality: string = '';
  isLoading = false;


  constructor(private formBuilder: FormBuilder, public userDetailsService: UserDetailsService) {
  }

  ngOnInit(): void {
  }

  onFileSelectedForDataRecognition(event: Event) {
    this.isLoading = true;
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.fileReader = reader.result as string;
        Tesseract.recognize(this.fileReader).then(({data: {text}}) => {
          this.allRecognizedText = text.split('\n');
          this.lineOfLastName = this.allRecognizedText[4].split(' ');
          this.lineOfFirstName = this.allRecognizedText[6].split(' ');
          this.lineOfAddress = this.allRecognizedText[13].split(' ');
          this.lineOfTown = this.allRecognizedText[12].split(' ');
          this.lineOfGender = this.allRecognizedText[8].split(' ');
          this.lineOfNationality = this.allRecognizedText[8].split(' ');
          if (this.lineOfLastName.includes('Nume/Nom/Last')||this.lineOfLastName.includes('Nume/Nom/Lastname')) {
            this.lineOfLastName = this.allRecognizedText[5].split(' ');
            this.lineOfFirstName = this.allRecognizedText[7].split(' ');
            this.lineOfAddress = this.allRecognizedText[14].split(' ');
            this.lineOfTown = this.allRecognizedText[13].split(' ');
            this.lineOfGender = this.allRecognizedText[9].split(' ');
            this.lineOfNationality = this.allRecognizedText[9].split(' ');
          }
          for (let i = 0; i < this.lineOfLastName.length; i++) {
            if (this.lineOfLastName[i].length > 4 && this.lineOfLastName[i].match("[a-zA-Z]")) {
              this.lastName = this.lineOfLastName[i];
              break;
            }
          }
          for (let i = 0; i < this.lineOfFirstName.length; i++) {
            if (this.lineOfFirstName[i].length > 2 && this.lineOfFirstName[i].match("[a-zA-Z-]*")) {
              this.firstName = this.lineOfFirstName[i];
              break;
            }
          }
          for (let i = 0; i < this.lineOfTown.length; i++) {
            if (this.lineOfTown[i].length > 3) {
              this.town = this.lineOfTown[i];
              break;
            }
          }
          for (let i = 0; i < this.lineOfNationality.length; i++) {
            if (this.lineOfNationality[i].length == 3) {
              this.nationality = this.lineOfNationality[i];
              break;
            }
          }
          console.log(this.allRecognizedText);
          this.address = this.lineOfAddress.toString();
          this.gender = this.lineOfGender[this.lineOfGender.length - 1];
          this.userDetailsService.autoCompleteForm.setValue({
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            address: this.address,
            town: this.town,
            nationality: this.nationality
          });
          this.userDetailsService.isFileSelected = true;
          this.isLoading = false;
        })
      };
    }

  }

  clickCancel() {
    this.userDetailsService.isFileRefused = true;
  }


}

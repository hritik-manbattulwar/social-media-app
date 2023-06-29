import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IUser } from 'src/app/user/models/IUser';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  title = 'angular13bestcode';

  user: IUser | any = {}

  personalDetails: FormGroup | any;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  multiform!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {

    this.user = this.userService.getUser(this.userService.getUserData().email)
    console.log('Edit-Profile', this.user)
    this.personalDetails = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      avatar: [this.user.avatar, Validators.required],
      coverPhoto: [this.user.coverPhoto, Validators.required],
      email: [this.user.contact.email, Validators.required],
      nickname: [this.user.basic.nickName, Validators.required],
      primaryPhone: [this.user.contact.primaryPhone, Validators.required],
      secondaryPhone: [this.user.contact.secondaryPhone],
      gender: [this.user.basic.gender, Validators.required],
      dob: ['', Validators.required],
      // dob: new FormControl().setValue(),
      languages: [this.user.basic.languages, Validators.required],
      aboutYou: [this.user.basic.aboutYou, Validators.required],
      favouriteQuote: [this.user.basic.favouriteQuote, Validators.required],
      instagram: [this.user.social.insta],
      twitter: [this.user.social.twitter],
      website: [this.user.social.website],
    });
    this.personalDetails.get('dob').patchValue(this.formatDate(this.user.basic.dob));

    this.addressDetails = this.formBuilder.group({
      currentCity: [this.user.address.currentCity, Validators.required],
      currentState: [this.user.address.currentState, Validators.required],
      homeCity: [this.user.address.homeCity, Validators.required],
      homeState: [this.user.address.homeState, Validators.required],
      country: [this.user.address.country, Validators.required],
    });

    this.educationalDetails = this.formBuilder.group({
      designation: [this.user.work.designation, Validators.required],
      organization: [this.user.work.organization, Validators.required],
      college: [this.user.education.college],
      highSchool: [this.user.education.highSchool, Validators.required],
      school: [this.user.education.school, Validators.required]
    });

    this.multiform = new FormGroup({
      personal: this.personalDetails,
      address: this.addressDetails,
      education: this.educationalDetails,
    })
  }

  get personal() { return this.personalDetails.controls; }

  get address() { return this.addressDetails.controls; }

  get education() { return this.educationalDetails.controls; }
  next() {

    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalDetails.invalid) { return }
      this.step++
    }

    else if (this.step == 2) {
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
      this.step++;
    }


  }

  previous() {
    this.step--

    if (this.step == 1) {
      this.address_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }

  }

  submit() {

    if (this.step == 3) {
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
      else {
        this.userService.editProfile(this.multiform.value)
      }
    }
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
import {Component, effect, OnInit, signal} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Button} from "primeng/button";
import {NgClass, NgIf} from "@angular/common";
import {delay, of} from "rxjs";
import {MessageModule} from "primeng/message";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    Button,
    NgIf,
    NgClass,
    MessageModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading = signal(false);
  responseMsg = signal("");

  constructor(fb: FormBuilder) {
    this.contactForm = fb.group({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      message: new FormControl('', {validators: [Validators.required, Validators.maxLength(300)]}),
    });

    effect(() => {
      if (this.isLoading()) {
        this.contactForm.disable();
      } else {
        this.contactForm.enable();
      }
    });
  }

  isInvalidAndDirty(name: string): boolean | undefined {
    return this.contactForm.get(name)?.invalid && (this.contactForm.get(name)?.dirty || this.contactForm.get(name)?.touched)
  }

  sendMessage(): void {
    if (this.contactForm.invalid)
      return;

    console.log(this.contactForm.value);
    this.responseMsg.set("");
    this.isLoading.set(true);
    of(null).pipe(delay(2000)).subscribe(() => {
      this.isLoading.set(false);
      this.responseMsg.set("Demande de contact envoyée avec succès")
      this.contactForm.reset();
    });
  }

}

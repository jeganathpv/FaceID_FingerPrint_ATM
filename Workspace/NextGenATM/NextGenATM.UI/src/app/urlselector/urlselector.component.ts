import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MiddlewareService } from "../middleware.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-urlselector",
  templateUrl: "./urlselector.component.html",
  styleUrls: ["./urlselector.component.css"]
})
export class UrlselectorComponent implements OnInit {
  validUrl: boolean = true;
  urlForm: FormGroup;
  serviceUp: boolean;
  errorMsg: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private middlewareService: MiddlewareService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.urlForm = this.formBuilder.group({ url: "" });
  }
  /**
   * Handles the urlselection and validates the entered url
   * @param formValue contains the value of the url form
   */
  onSubmit(formValue) {
    const pattern = /^((http:\/\/)|(www.))(?:([a-zA-Z]+)|(\d+\.\d+.\d+.\d+)):\d+$/gm;
    if (formValue.url === "" || formValue.url === null) {
      this.messageService.add({
        severity: "warn",
        summary: "Field Required",
        detail: "Please fill out the url to continue"
      });
      return;
    } else if (formValue.url.match(pattern)) {
      if (formValue.url.includes("5000") || formValue.url.includes("5100")) {
        this.middlewareService.setBaseUrl(formValue.url);
        this.middlewareService
          .checkHealth()
          .then(() => {
            this.router.navigate(['/atm-flow']);
            //Switch comment while Packing
            // this.router.navigate(["/enrollment"]);
          })
          .catch(() => {
            console.error("Service down");
            this.errorMsg = "Something went wrong. Please contact the admin.";
          });
      } else {
        this.messageService.add({
          severity: "error",
          summary: "Port Invalid",
          detail: "Port is not existing in the instance"
        });
        return;
      }
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Invalid URL",
        detail: "Please enter the valid url"
      });
      return;
    }
  }
}

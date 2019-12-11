import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
	selector: "textarea[autoresize]" // Attribute selector
})
export class Autoresize {

	@HostListener("input", ["$event.target"])
	onInput(textArea: HTMLTextAreaElement): void {
		this.adjust();
	}
	constructor(public element: ElementRef) {
	}
	ngOnInit(): void {
		this.adjust();
	}
	adjust(): void {
        // let ta = this.element.nativeElement.querySelector("textarea");
        let ta = this.element.nativeElement;
		ta.style.overflow = "auto";
		ta.style.height = "auto";
		ta.style.height = ta.scrollHeight + "px";
	}
}
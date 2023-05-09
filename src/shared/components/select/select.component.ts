import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ISelectOptionModel } from '../../types/select-option.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'shared-select',
  templateUrl: './select.component.html',
  styleUrls: [ './select.component.scss' ],
})
export class SelectComponent implements OnInit, OnDestroy {
  @ViewChild('select') private _select!: ElementRef;
  @ViewChild(CdkPortal) private _contentTemplate!: CdkPortal;

  @Input() dropdownOptions: ISelectOptionModel[] = [];

  private _selected: ISelectOptionModel | undefined;
  @Input() get selected() {
    return this._selected;
  }
  set selected(value: ISelectOptionModel | undefined) {
    this._selected = value;
    this._updateDisplayText();
  }
  @Output() selectedChange: EventEmitter<ISelectOptionModel> = new EventEmitter<ISelectOptionModel>();


  private _placeholder = 'Select an option';
  @Input() get placeholder() {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this._updateDisplayText();
  }

  showPlaceholder = true;
  showing = false;
  displayText!: string;

  private _overlayRef!: OverlayRef;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _overlay: Overlay,) {}

  ngOnInit(): void {
    if (!this.displayText) {
      this.displayText = this.placeholder;
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // creates CDK Overlay using config. Attaching to cdk-portal ng-template
  // syncs width the select element width
  // hide it when we click outside the overlay
  showDropdown(): void {
    if (this.dropdownOptions?.length) {
      this._overlayRef = this._overlay.create(this._getOverlayConfig());
      this._overlayRef.attach(this._contentTemplate);
      this._syncWidth();
      this._overlayRef.backdropClick()
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this._hide());
      this.showing = true;
    }
  }

  selectOption(option: ISelectOptionModel): void {
    this._hide();
    if (this.selected !== option) {
      this.selected = option;
      this._onChange();
      this._updateDisplayText();
    }
  }

  private _updateDisplayText(): void {
    if (this.selected !== undefined) {
      this.displayText = this.selected.label;
      this.showPlaceholder = false;
    } else {
      this.displayText = this.placeholder;
      this.showPlaceholder = true;
    }
  }

  private _onChange(): void {
    this.selectedChange.emit(this.selected);
  }

  // overlay config, sets to connect to our select container
  // withPush makes sure it stays in the viewport
  // second position is above the select container if needed as a backup
  // scroll strategy will move overlay up and down when user scrolls page
  private _getOverlayConfig(): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._select.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    const scrollStrategy = this._overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private _syncWidth(): void {
    if (!this._overlayRef) {
      return;
    }
    const refRectWidth = this._select.nativeElement.getBoundingClientRect().width;
    this._overlayRef.updateSize({ width: refRectWidth });
  }

  private _hide(): void {
    this._overlayRef.detach();
    this.showing = false;
  }
}

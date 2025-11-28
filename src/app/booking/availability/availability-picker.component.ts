import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../shared/components/toast.service';
import { MentorService, Mentor } from '../../core/services/mentor.service';

interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-availability-picker',
  templateUrl: './availability-picker.component.html',
  styleUrls: ['./availability-picker.component.css']
})
export class AvailabilityPickerComponent implements OnInit {
  bookingForm!: FormGroup;
  selectedDate: Date | null = null;
  selectedSlot: TimeSlot | null = null;
  mentor: Mentor | undefined;

  // Date Selection
  currentDate = new Date();
  selectedYear: number = this.currentDate.getFullYear();
  selectedMonth: number = this.currentDate.getMonth();
  years: number[] = [];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  availableDates: Date[] = [];

  // Time slots for selected date
  timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:30 PM', available: true },
    { time: '05:00 PM', available: false }
  ];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private mentorService: MentorService
  ) {
    // Generate years (current + next 2)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.years.push(currentYear + i);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mentorId = params['mentorId'];
      if (mentorId) {
        this.loadMentor(mentorId);
      } else {
        // Fallback or redirect if no mentor ID
        this.toast.show('No mentor selected', 'error');
        this.router.navigate(['/mentors']);
      }
    });

    this.generateAvailableDates();
  }

  loadMentor(id: string) {
    this.mentorService.getMentorById(id).subscribe(mentor => {
      if (mentor) {
        this.mentor = mentor;
        this.initForm();
      } else {
        this.toast.show('Mentor not found', 'error');
        this.router.navigate(['/mentors']);
      }
    });
  }

  initForm() {
    if (!this.mentor) return;

    this.bookingForm = this.fb.group({
      mentorId: [this.mentor.id, Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  generateAvailableDates() {
    this.availableDates = [];
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.selectedYear, this.selectedMonth, i);
      // Only add future dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date >= today) {
        this.availableDates.push(date);
      }
    }
  }

  onYearChange() {
    this.generateAvailableDates();
    this.resetSelection();
  }

  onMonthChange() {
    this.generateAvailableDates();
    this.resetSelection();
  }

  resetSelection() {
    this.selectedDate = null;
    this.selectedSlot = null;
    if (this.bookingForm) {
      this.bookingForm.patchValue({
        date: '',
        timeSlot: ''
      });
    }
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.bookingForm.patchValue({ date: date.toISOString() });
    this.selectedSlot = null;
    this.bookingForm.patchValue({ timeSlot: '' });
  }

  selectTimeSlot(slot: TimeSlot) {
    if (!slot.available) {
      this.toast.show('This time slot is not available', 'error');
      return;
    }
    this.selectedSlot = slot;
    this.bookingForm.patchValue({ timeSlot: slot.time });
  }

  isDateSelected(date: Date): boolean {
    return this.selectedDate?.toDateString() === date.toDateString();
  }

  proceedToCheckout() {
    if (this.bookingForm.invalid) {
      this.toast.show('Please select a date and time slot', 'error');
      return;
    }

    // Store booking data in session storage or service
    sessionStorage.setItem('bookingData', JSON.stringify({
      ...this.bookingForm.value,
      mentor: this.mentor
    }));

    this.router.navigate(['/booking/details']);
  }

  // New method for back navigation used in template
  goBack() {
    this.router.navigate(['/mentors']);
  }
}

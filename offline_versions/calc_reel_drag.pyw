import tkinter as tk
from tkinter import ttk

def calculate_reel_drag(max_drag, num_settings, desired_setting):
    """
    Calculates the drag of a reel in Fishing Planet based on its maximum drag
    and number of drag settings.

    Args:
        max_drag (float): The maximum drag of the reel (e.g., in pounds or kilograms).
        num_settings (int): The number of drag settings available on the reel.
        desired_setting (int): The specific drag setting you want to calculate for.

    Returns:
        float: The calculated drag at the desired setting.
    """

    # Input validation (ensures valid numbers are provided)
    if not isinstance(max_drag, (int, float)) or max_drag <= 0:
        raise ValueError("max_drag must be a positive number.")
    if not isinstance(num_settings, int) or num_settings <= 0:
        raise ValueError("num_settings must be a positive integer.")
    if not isinstance(desired_setting, int) or not (1 <= desired_setting <= num_settings):
        raise ValueError(f"desired_setting must be an integer between 1 and {num_settings}.")

    drag_per_setting = max_drag / num_settings
    drag_at_desired_setting = drag_per_setting * desired_setting
    return drag_at_desired_setting

def create_gui():
    """Creates and runs the Tkinter GUI for the drag calculator."""
    root = tk.Tk()
    root.title("Reel Drag Calculator")

    # Use a themed frame for better aesthetics
    main_frame = ttk.Frame(root, padding="10 10 10 10")
    main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

    # --- Input Fields ---
    ttk.Label(main_frame, text="Max Drag (lbs/kg):").grid(column=0, row=0, sticky=tk.W, pady=2)
    max_drag_entry = ttk.Entry(main_frame, width=20)
    max_drag_entry.grid(column=1, row=0, sticky=(tk.W, tk.E), pady=2)

    ttk.Label(main_frame, text="Number of Settings:").grid(column=0, row=1, sticky=tk.W, pady=2)
    num_settings_entry = ttk.Entry(main_frame, width=20)
    num_settings_entry.grid(column=1, row=1, sticky=(tk.W, tk.E), pady=2)

    ttk.Label(main_frame, text="Desired Setting:").grid(column=0, row=2, sticky=tk.W, pady=2)
    desired_setting_entry = ttk.Entry(main_frame, width=20)
    desired_setting_entry.grid(column=1, row=2, sticky=(tk.W, tk.E), pady=2)

    # --- Output and Controls ---
    result_var = tk.StringVar()
    error_var = tk.StringVar()

    def perform_calculation():
        """Gets values from entries, calculates drag, and updates the UI."""
        result_var.set("")
        error_var.set("")
        try:
            # Retrieve and convert user input
            max_drag = float(max_drag_entry.get())
            num_settings = int(num_settings_entry.get())
            desired_setting = int(desired_setting_entry.get())

            # The original function handles all the validation
            calculated_drag = calculate_reel_drag(max_drag, num_settings, desired_setting)
            result_var.set(f"{calculated_drag:.2f}")

        except ValueError as e:
            # Catches conversion errors (e.g., text in a number field)
            # and validation errors from the calculate_reel_drag function.
            error_var.set(f"Error: {e}")

    ttk.Button(main_frame, text="Calculate", command=perform_calculation).grid(column=1, row=3, sticky=tk.E, pady=10)

    ttk.Label(main_frame, text="Calculated Drag:", font=("Segoe UI", 10, "bold")).grid(column=0, row=4, sticky=tk.W, pady=(5,0))
    ttk.Label(main_frame, textvariable=result_var, foreground="blue", font=("Segoe UI", 12, "bold")).grid(column=1, row=4, sticky=tk.W, pady=(5,0))
    ttk.Label(main_frame, textvariable=error_var, foreground="red", wraplength=250).grid(column=0, row=5, columnspan=2, sticky=tk.W)

    root.mainloop()

if __name__ == "__main__":
    create_gui()
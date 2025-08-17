# def calculate_reel_drag(max_drag, num_settings, desired_setting):
#     """
#     Calculates the drag of a reel in Fishing Planet based on its maximum drag
#     and number of drag settings.

#     Args:
#         max_drag (float): The maximum drag of the reel (e.g., in pounds or kilograms).
#         num_settings (int): The number of drag settings available on the reel.
#         desired_setting (int): The specific drag setting you want to calculate for.

#     Returns:
#         float: The calculated drag at the desired setting.
#     """

#     if not isinstance(max_drag, (int, float)) or max_drag <= 0:
#         raise ValueError("max_drag must be a positive number.")
#     if not isinstance(num_settings, int) or num_settings <= 0:
#         raise ValueError("num_settings must be a positive integer.")
#     if not isinstance(desired_setting, int) or not (1 <= desired_setting <= num_settings):
#         raise ValueError(f"desired_setting must be an integer between 1 and {num_settings}.")

#     drag_per_setting = max_drag / num_settings
#     drag_at_desired_setting = drag_per_setting * desired_setting
#     return drag_at_desired_setting

# # Prompt user for input
# try:
#     max_drag_reel = float(input("Enter the maximum drag of the reel (e.g., 26.4): "))
#     num_drag_settings = int(input("Enter the number of drag settings: "))
#     desired_drag_setting = int(input(f"Enter the desired drag setting (1 to {num_drag_settings}): "))

#     calculated_drag = calculate_reel_drag(max_drag_reel, num_drag_settings, desired_drag_setting)
#     print(f"The drag at setting {desired_drag_setting} is: {calculated_drag:.2f} pounds.")
# except Exception as e:
#     print(f"Error: {e}")


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

# Get user input for reel specifications and desired drag setting
while True: # Ensures valid input for maximum drag
    try:
        max_drag_str = input("Enter the maximum drag of the reel (e.g., in pounds or kilograms): ")
        max_drag_reel = float(max_drag_str) # Converts string input to a float number
        if max_drag_reel <= 0:
            print("Maximum drag must be a positive number.")
            continue # Goes to the next iteration of the loop, asking for input again
        break # Exits the loop if the input is valid
    except ValueError: # Catches the error if the input cannot be converted to a float
        print("Invalid input! Please enter a valid number for maximum drag.")

while True: # Ensures valid input for number of drag settings
    try:
        num_settings_str = input("Enter the number of drag settings on the reel: ")
        num_drag_settings = int(num_settings_str) # Converts string input to an integer
        if num_drag_settings <= 0:
            print("Number of drag settings must be a positive integer.")
            continue
        break
    except ValueError:
        print("Invalid input! Please enter a valid integer for the number of drag settings.")

while True: # Ensures valid input for the desired drag setting
    try:
        desired_setting_str = input(f"Enter the desired drag setting (1 to {num_drag_settings}): ")
        desired_drag_setting = int(desired_setting_str)
        if not (1 <= desired_drag_setting <= num_drag_settings):
            print(f"Desired drag setting must be between 1 and {num_drag_settings}.")
            continue
        break
    except ValueError:
        print("Invalid input! Please enter a valid integer for the desired drag setting.")

# Calculate and display the result
try:
    calculated_drag = calculate_reel_drag(max_drag_reel, num_drag_settings, desired_drag_setting)
    print(f"\nThe drag at setting {desired_drag_setting} is: {calculated_drag:.2f} pounds.")
except ValueError as e:
    print(f"\nError: {e}") # Catches specific ValueError exceptions raised by the function
# This code calculates the drag of a fishing reel based on user input for maximum drag,
# number of settings, and desired setting. It includes input validation to ensure
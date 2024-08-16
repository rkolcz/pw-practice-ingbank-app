# Test Summary
This document provides a high-level overview of the conducted tests.

## Cookie validation modal test (`cookieValidation.spec.ts`) conducted

1. **Verify Cookie Policy Frame**
   - Ensured visibility of the cookie policy frame.
   - Checked the title text within the frame.
   - Verified the body text of the cookie policy description.
   - Confirmed the presence and text of required buttons: "Dostosuj", "Odrzuć wszystkie", "Zaakceptuj wszystkie".

2. **Customise Cookies Using Toggle Buttons**
   - Verified visibility of technical, analytical, and marketing cookie toggle buttons.
   - Checked and asserted the state of all toggle buttons to be on.
   - (Commented) Included checks to uncheck all enabled toggle buttons sequentially.

3. **Reject All Cookies**
   - Verified functionality of the "Odrzuć wszystkie" button.
   - Confirmed the cookie policy information box displays the correct message upon rejection.

4. **Accept All Cookies**
   - Verified functionality of the "Zaakceptuj wszystkie" button.
   - Confirmed the cookie policy information box displays the correct message upon acceptance.


## Login form validation & security tests (loginForm.spec.ts)

1. **Validate Empty Field Submission**
   - Verified that submitting the form with empty fields triggers the appropriate validation messages.
   - Validate Short Username Submission

2. **Ensured that the form blocks submission and displays a validation message when a username that is too short is entered.**
   - Validate Incorrect Username Format

3. **Checked that the form prevents submission and shows a validation message when a username with incorrect format or characters is entered.**
   - Account Lockout After Multiple Failed Logins

4. **Simulated 11 failed login attempts to test account lockout functionality.**
   - Note: Identified an app bug where no lockout occurred; recommended reducing the limit to 3 attempts.
-  1. **Validate Submission with Invalid Characters

5. **Tested the form’s response to usernames containing various special characters to ensure they are properly blocked with a validation message.**
   - Prevent SQL Injection Attacks

6. **Validated that the form blocks SQL injection attempts by submitting the malicious input "' OR 1=1 --" and confirming that a validation message is shown.**
   - Prevent XSS Attacks in Login Field

7. **Used multiple XSS attack scripts from test data to ensure that the form blocks these inputs and prevents any execution of malicious scripts.**
   - Validate Successful Login Attempt

8. **Tested the form’s response to a valid username submission, with a placeholder to handle validation for successful logins in the future.**
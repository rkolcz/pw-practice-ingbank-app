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

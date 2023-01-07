# mka-connect

A library for generating links to connect to contacts in a Google Sheet.

## Usage

### 1. Create a Google Sheet

The following contacts are not real. Some of them were taken from the internet, others were generated randomly. You are suggested to use your own contacts.

| | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | **Name** | **Channel** | **Contact** | **WhatsApp** | **Sms** | **Call** | **Email** | **Subject** | **Message** | **WhatsAppLink** | **SmsLink** | **CallLink** | **EmailLink** | **Row** | **Recipient** | **Link** | **List** |
| 2 | John Doe | whatsapp | +880413283069 | | | | | | | | | | | | | | |
| 3 | Jane Doe | sms | +114856168061 | | | | | | | | | | | | | | |
| 4 | Mr Brown | call | +442087599036 | | | | | | | | | | | | | | |
| 5 | Common Man | email | commonman@example.com | | | | | | | | | | | | | | |
| 6 | Joe Doakes | whatsapp | +449252650312 | | | | | | | | | | | | | | |
| 7 | Mr Taxpayer | sms | +880102696727 | | | | | | | | | | | | | | |
| 8 | Mr Nobody | call | +8004444444 | | | | | | | | | | | | | | |
| 9 | Richard Roe | email | richardroe@example.com | | | | | | | | | | | | | | |
| 10 | Average Joe | whatsapp | +442328945390 | | | | | | | | | | | | | | |
| 11 | Ordinary Joe | sms | +117214081795 | | | | | | | | | | | | | | |
| 12 | Joe Blogs | call | +880125218661 | | | | | | | | | | | | | | |
| 13 | Jade Smith | email | jadesmith@example.com | | | | | | | | | | | | | | |
| 14 | Middle Man | whatsapp | +112693128676 | | | | | | | | | | | | | | |
| 15 | Street Guy | sms | +440025904013 | | | | | | | | | | | | | | |
| 16 | The Officer | call | +12136210002 | | | | | | | | | | | | | | |
| 17 | Towns Vill | email | powerpuff@example.com | | | | | | | | | | | | | | |

### 2. Link an Apps Script

From the Extensions menu, select Apps Script. This will create a new Apps Script project and link it to your spreadsheet. Copy the contents of [code.js](https://github.com/Grimmscorpp/mka-connect/blob/main/code.js) there and save the project.

### 3. Apply formulae

Some of the formulae need to be pulled from the first row down to the last.

* D2: `=IF(B2 = "whatsapp", C2, "")`.
  * Fill down to D17.
* E2: `=IF(B2 = "sms", C2, "")`.
  * Fill down to E17.
* F2: `=IF(B2 = "call", C2, "")`.
  * Fill down to F17.
* G2: `=IF(B2 = "email", C2, "")`.
  * Fill down to G17.
* H2: `=ENCODEURL("Greetings")`.
  * Fill down to H17.
* I2: `=ENCODEURL("Hello there!")`.
  * Fill down to I17.
* J2: `=WHATSAPP(D2:D17, I2:I17, "Send")`.
* K2: `=SMS(E2:E17, I2:I17, "Send")`.
* L2: `=TEL(F2:F17, "Call")`.
* M2: `=MAILTO(G2:G17, H2:H17, I2:I17, "Send")`.
* N2: `=ROW()-1`.
  * Fill down to N17.
* O2: `=A2`.
  * Fill down to O17.
* P2: `=CONCATENATE(J2:M2)`.
  * Fill down to P17.
* Q2: `=LIST(N2:P17, "Send Messages", 2)`.

| | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | **Name** | **Channel** | **Contact** | **WhatsApp** | **Sms** | **Call** | **Email** | **Subject** | **Message** | **WhatsAppLink** | **SmsLink** | **CallLink** | **EmailLink** | **Row** | **Recipient** | **Link** | **List** |
| 2 | John Doe | whatsapp | +880413283069 | +880413283069 | | | | Greetings | Hello%20there%21 | <a href="...">Send</a> | | | | 1 | John Doe | <a href="...">Send</a> | <DOCTYPE html... |
| 3 | Jane Doe | sms | +114856168061 | | +114856168061 | | | Greetings | Hello%20there%21 | | <a href="...">Send</a> | | | 2 | Jane Doe | <a href="...">Send</a> | |
| 4 | Mr Brown | call | +442087599036 | | | +442087599036 | | Greetings | Hello%20there%21 | | | <a href="...">Call</a> | | 3 | Mr Brown | <a href="...">Call</a> | |
| 5 | Common Man | email | commonman@example.com | | | | commonman@example.com | Greetings | Hello%20there%21 | | | | <a href="...">Send</a> | 4 | Common Man | <a href="...">Send</a> | |
| 6 | Joe Doakes | whatsapp | +449252650312 | +449252650312 | | | | Greetings | Hello%20there%21 | <a href="...">Send</a> | | | | 5 | Joe Doakes | <a href="...">Send</a> | |
| 7 | Mr Taxpayer | sms | +880102696727 | | +880102696727 | | | Greetings | Hello%20there%21 | | <a href="...">Send</a> | | | 6 | Mr Taxpayer | <a href="...">Send</a> | |
| 8 | Mr Nobody | call | +8004444444 | | | +8004444444 | | Greetings | Hello%20there%21 | | | <a href="...">Call</a> | | 7 | Mr Nobody | <a href="...">Call</a> | |
| 9 | Richard Roe | email | richardroe@example.com | | | | richardroe@example.com | Greetings | Hello%20there%21 | | | | <a href="...">Send</a> | 8 | Richard Roe | <a href="...">Send</a> | |
| 10 | Average Joe | whatsapp | +442328945390 | +442328945390 | | | | Greetings | Hello%20there%21 | <a href="...">Send</a> | | | | 9 | Average Joe | <a href="...">Send</a> | |
| 11 | Ordinary Joe | sms | +117214081795 | | +117214081795 | | | Greetings | Hello%20there%21 | | <a href="...">Send</a> | | | 10 | Ordinary Joe | <a href="...">Send</a> | |
| 12 | Joe Blogs | call | +880125218661 | | | +880125218661 | | Greetings | Hello%20there%21 | | | <a href="...">Call</a> | | 11 | Joe Blogs | <a href="...">Call</a> | |
| 13 | Jade Smith | email | jadesmith@example.com | | | | jadesmith@example.com | Greetings | Hello%20there%21 | | | | <a href="...">Send</a> | 12 | Jade Smith | <a href="...">Send</a> | |
| 14 | Middle Man | whatsapp | +112693128676 | +112693128676 | | | | Greetings | Hello%20there%21 | <a href="...">Send</a> | | | | 13 | Middle Man | <a href="...">Send</a> | |
| 15 | Street Guy | sms | +440025904013 | | +440025904013 | | | Greetings | Hello%20there%21 | | <a href="...">Send</a> | | | 14 | Street Guy | <a href="...">Send</a> | |
| 16 | The Officer | call | +12136210002 | | | +12136210002 | | Greetings | Hello%20there%21 | | | <a href="...">Call</a> | | 15 | The Officer | <a href="...">Call</a> | |
| 17 | Towns Vill | email | powerpuff@example.com | | | | powerpuff@example.com | Greetings | Hello%20there%21 | | | | <a href="...">Send</a> | 16 | Towns Vill | <a href="...">Send</a> | |

### 4. Save the list

After applying the steps above, Q2 will hold the final list. Copy the contents into an HTML file. Then open the file using a mobile browser and start sending messages! Cool?

### 5. Note

The maximum allowed number characters in a single cell in Google Sheet is 5000. If the contents of the list exceeds this limit, the contents will overflow to the adjascent rows.

<style>
  th, td:first-child {
    border-style: none;
  }
  td {
    border-style: solid;
  }
</style>

# mka-connect

A library for generating links to connect and send personalized messages to contacts in a Google Sheet.

## Usage

### 1. Create a Google Sheet

The following contacts are fake. Use your own.

|    | A            | B           | C                      |
| -: | ------------ | ----------- | ---------------------- |
| 1  | **Name**     | **Channel** | **Contact**            |
| 2  | John Doe     | whatsapp    | +880413283069          |
| 3  | Jane Doe     | sms         | +114856168061          |
| 4  | Mr Brown     | call        | +442087599036          |
| 5  | Common Man   | email       | commonman@example.com  |
| 6  | Joe Doakes   | whatsapp    | +449252650312          |
| 7  | Mr Taxpayer  | sms         | +880102696727          |
| 8  | Mr Nobody    | call        | +8004444444            |
| 9  | Richard Roe  | email       | richardroe@example.com |
| 10 | Average Joe  | whatsapp    | +442328945390          |
| 11 | Ordinary Joe | sms         | +117214081795          |
| 12 | Joe Blogs    | call        | +880125218661          |
| 13 | Jade Smith   | email       | jadesmith@example.com  |
| 14 | Middle Man   | whatsapp    | +112693128676          |
| 15 | Street Guy   | sms         | +440025904013          |
| 16 | The Officer  | call        | +12136210002           |
| 17 | The Mayor    | email       | townsvill@example.com  |

### 2. Link an Apps Script

1. Go to Extensions > Apps Script.
1. Copy-paste the contents of [code.js](https://github.com/Grimmscorpp/mka-connect/blob/main/code.js).
1. Save the project.

This will make the custom functions in this repo available to your spreadsheet.

### 3. Separate contacts based on types

* D2: `=IF(B2 = "whatsapp", C2, "")`.
  * Fill down to the last row.
* E2: `=IF(B2 = "sms", C2, "")`.
  * Fill down to the last row.
* F2: `=IF(B2 = "call", C2, "")`.
  * Fill down to the last row.
* G2: `=IF(B2 = "email", C2, "")`.
  * Fill down to the last row.

|    | D             | E             | F             | G                      |
| -: | ------------- | ------------- | ------------- | ---------------------- |
| 1  | **WhatsApp**  | **Sms**       | **Call**      | **Email**              |
| 2  | +880413283069 |               |               |                        |
| 3  |               | +114856168061 |               |                        |
| 4  |               |               | +442087599036 |                        |
| 5  |               |               |               | commonman@example.com  |
| 6  | +449252650312 |               |               |                        |
| 7  |               | +880102696727 |               |                        |
| 8  |               |               | +8004444444   |                        |
| 9  |               |               |               | richardroe@example.com |
| 10 | +442328945390 |               |               |                        |
| 11 |               | +117214081795 |               |                        |
| 12 |               |               | +880125218661 |                        |
| 13 |               |               |               | jadesmith@example.com  |
| 14 | +112693128676 |               |               |                        |
| 15 |               | +440025904013 |               |                        |
| 16 |               |               | +12136210002  |                        |
| 17 |               |               |               | townsvill@example.com  |

### 4. Add message subject and body

* H2: `=ENCODEURL("Greetings")`.
  * Fill down to the last row.
* I2: `=ENCODEURL("Hello "&A2&"!")`.
  * Fill down to the last row.

|    | H           | I                         |
| -: | ----------- | ------------------------- |
| 1  | **Subject** | **Body**                  |
| 2  | Greetings   | Hello%20John%20Doe%21     |
| 3  | Greetings   | Hello%20Jane%20Doe%21     |
| 4  | Greetings   | Hello%20Mr%20Brown%21     |
| 5  | Greetings   | Hello%20Common%20Man%21   |
| 6  | Greetings   | Hello%20Joe%20Doakes%21   |
| 7  | Greetings   | Hello%20Mr%20Taxpayer%21  |
| 8  | Greetings   | Hello%20Mr%20Nobody%21    |
| 9  | Greetings   | Hello%20Richard%20Roe%21  |
| 10 | Greetings   | Hello%20Average%20Joe%21  |
| 11 | Greetings   | Hello%20Ordinary%20Joe%21 |
| 12 | Greetings   | Hello%20Joe%20Blogs%21    |
| 13 | Greetings   | Hello%20Jade%20Smith%21   |
| 14 | Greetings   | Hello%20Middle%20Man%21   |
| 15 | Greetings   | Hello%20Street%20Guy%21   |
| 16 | Greetings   | Hello%20The%20Officer%21  |
| 17 | Greetings   | Hello%20The%20Mayor%21    |

### 5. Apply formulae

* J2: `=WHATSAPP(D2:D17, I2:I17, "Send")`.
* K2: `=SMS(E2:E17, I2:I17, "Send")`.
* L2: `=TEL(F2:F17, "Call")`.
* M2: `=MAILTO(G2:G17, H2:H17, I2:I17, "Send")`.

|    | J                        | K                        | L                        | M                        |
| -: | ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| 1  | **WhatsAppLink**         | **SmsLink**              | **CallLink**             | **EmailLink**            |
| 2  | `<a href="...">Send</a>` |                          |                          |                          |
| 3  |                          | `<a href="...">Send</a>` |                          |                          |
| 4  |                          |                          | `<a href="...">Call</a>` |                          |
| 5  |                          |                          |                          | `<a href="...">Send</a>` |
| 6  | `<a href="...">Send</a>` |                          |                          |                          |
| 7  |                          | `<a href="...">Send</a>` |                          |                          |
| 8  |                          |                          | `<a href="...">Call</a>` |                          |
| 9  |                          |                          |                          | `<a href="...">Send</a>` |
| 10 | `<a href="...">Send</a>` |                          |                          |                          |
| 11 |                          | `<a href="...">Send</a>` |                          |                          |
| 12 |                          |                          | `<a href="...">Call</a>` |                          |
| 13 |                          |                          |                          | `<a href="...">Send</a>` |
| 14 | `<a href="...">Send</a>` |                          |                          |                          |
| 15 |                          | `<a href="...">Send</a>` |                          |                          |
| 16 |                          |                          | `<a href="...">Call</a>` |                          |
| 17 |                          |                          |                          | `<a href="...">Send</a>` |

### 6. Create the list

* N2: `=ROW()-1`.
  * Fill down to the last row.
* O2: `=A2`.
  * Fill down to the last row.
* P2: `=CONCATENATE(J2:M2)`.
  * Fill down to the last row.
* Q2: `=LIST(N2:P17, "Send Messages", 2)`.

|    | N       | O             | P                        | Q                  |
| -: | ------: | ------------- | ------------------------ | ------------------ |
| 1  | **Row** | **Recipient** | **Link**                 | **List**           |
| 2  | 1       | John Doe      | `<a href="...">Send</a>` | `<DOCTYPE html...` |
| 3  | 2       | Jane Doe      | `<a href="...">Send</a>` |                    |
| 4  | 3       | Mr Brown      | `<a href="...">Call</a>` |                    |
| 5  | 4       | Common Man    | `<a href="...">Send</a>` |                    |
| 6  | 5       | Joe Doakes    | `<a href="...">Send</a>` |                    |
| 7  | 6       | Mr Taxpayer   | `<a href="...">Send</a>` |                    |
| 8  | 7       | Mr Nobody     | `<a href="...">Call</a>` |                    |
| 9  | 8       | Richard Roe   | `<a href="...">Send</a>` |                    |
| 10 | 9       | Average Joe   | `<a href="...">Send</a>` |                    |
| 11 | 10      | Ordinary Joe  | `<a href="...">Send</a>` |                    |
| 12 | 11      | Joe Blogs     | `<a href="...">Call</a>` |                    |
| 13 | 12      | Jade Smith    | `<a href="...">Send</a>` |                    |
| 14 | 13      | Middle Man    | `<a href="...">Send</a>` |                    |
| 15 | 14      | Street Guy    | `<a href="...">Send</a>` |                    |
| 16 | 15      | The Officer   | `<a href="...">Call</a>` |                    |
| 17 | 16      | Towns Vill    | `<a href="...">Send</a>` |                    |

### 7. Save the list

Now, Q2 contains the final list in HTML. Copy its contents into an HTML file, open it using a mobile browser, and start messaging!

**Note:** The maximum number of characters a single Google Sheet cell can hold is 5000. In case the generated list contains more characters than that, it will overflow to the adjacent rows.

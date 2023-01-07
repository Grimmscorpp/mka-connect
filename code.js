/**
 * Creates DM links for an array of WhatsApp numbers.
 * @param {Array<Array>} phones The WhatsApp numbers.
 * @param {string | Array<Array>} [messages] The URL encoded message(s) to send.
 * @param {string | Array<Array>} [labels] The label(s) to show on the generated links.
 * @returns The supplied WhatsApp numbers turned into DM links with pre-filled message texts.
 * @customfunction
 */
function WHATSAPP(phones, messages, labels) {
  return createLinksInHtml_(
    phones,
    null,
    messages,
    labels,
    (phone, _, message, label) =>
      createAnchor_(`https://wa.me/${phone}?text=${message}`, label)
  );
}

/**
 * Creates SMS links for an array of phone numbers.
 * @param {Array<Array>} phones The phone numbers.
 * @param {string | Array<Array>} [messages] The URL encoded message(s) to send.
 * @param {string | Array<Array>} [labels] The label(s) to show on the generated links.
 * @returns The supplied phone numbers turned into SMS links with pre-filled message texts.
 * @customfunction
 */
function SMS(phones, messages, labels) {
  return createLinksInHtml_(
    phones,
    null,
    messages,
    labels,
    (phone, _, message, label) =>
      createAnchor_(`sms:${phone}?body=${message}`, label)
  );
}

/**
 * Creates phone-call links for an array of phone numbers.
 * @param {Array<Array>} phones The phone numbers.
 * @param {string | Array<Array>} [labels] The label(s) to show on the generated links.
 * @returns The supplied phone numbers turned into phone-call links.
 * @customfunction
 */
function TEL(phones, labels) {
  return createLinksInHtml_(
    phones,
    null,
    null,
    labels,
    (phone, _subject, _message, label) => createAnchor_(`tel:${phone}`, label)
  );
}

/**
 * Creates mailto links for an array of email addresses.
 * @param {Array<Array>} emails The email addresses.
 * @param {string | Array<Array>} [subjects] The URL encoded email subject(s).
 * @param {string | Array<Array>} [messages] The URL encoded email body/bodies.
 * @param {string | Array<Array>} [labels] The label(s) to show on the generated links.
 * @returns The supplied email addresses turned into mailto links with pre-filled subjects and bodies.
 * @customfunction
 */
function MAILTO(emails, subjects, messages, labels) {
  return createLinksInHtml_(
    emails,
    subjects,
    messages,
    labels,
    (email, subject, message, label) =>
      createAnchor_(`mailto:${email}?subject=${subject}&body=${message}`, label)
  );
}

/**
 * Turns a grid into an HTML list.
 * @param grid The grid to turn into an HTML list.
 * @param title The value of the HTML title and the list header.
 * @param numPartitions The maximum number of partitions to break the grid into.
 * @returns An HTML list from the grid broken down to the supplied number of partitions.
 * @customfunction
 */
function LIST(grid, title, numPartitions) {
  const possibleNumPartitions = Math.min(numPartitions || 1, 12, grid.length);
  const html =
    ' <!DOCTYPE html>' +
    ' <html>' +
    ' <head>' +
    ` <title>${title}</title>` +
    ' <link' +
    '   rel="stylesheet"' +
    '   href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"' +
    '   integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"' +
    '   crossorigin="anonymous"' +
    ' />' +
    ' <style>' +
    '   h1 {' +
    '     text-align: center;' +
    '   }' +
    ' </style>' +
    ' </head>' +
    ' <body>' +
    `   <h1>${title}</h1>` +
    '   <div class="container-fluid">' +
    '     <div class="row">' +
    `       ${createPartitions_(grid, possibleNumPartitions)}` +
    '     </div>' +
    '   </div>' +
    ' </body>' +
    ' </html>';
  const result = [];
  const maxCharsPerCell = 50000;
  for (let i = 0; i < html.length; i += maxCharsPerCell) {
    result.push([html.slice(i, i + maxCharsPerCell)]);
  }
  return result;
}

function createLinksInHtml_(
  contacts,
  subjects,
  messages,
  labels,
  linkGenerator
) {
  if (isNullOrUndefined_(subjects)) {
    return createLinksInHtml_(
      contacts,
      contacts.map((row) => row.map(() => '')),
      messages,
      labels,
      linkGenerator
    );
  }

  if (!Array.isArray(subjects)) {
    return createLinksInHtml_(
      contacts,
      contacts.map((row) => row.map(() => subjects)),
      messages,
      labels,
      linkGenerator
    );
  }

  if (isNullOrUndefined_(messages)) {
    return createLinksInHtml_(
      contacts,
      subjects,
      contacts.map((row) => row.map(() => '')),
      labels,
      linkGenerator
    );
  }

  if (!Array.isArray(messages)) {
    return createLinksInHtml_(
      contacts,
      subjects,
      contacts.map((row) => row.map(() => messages)),
      labels,
      linkGenerator
    );
  }

  if (isNullOrUndefined_(labels)) {
    return createLinksInHtml_(
      contacts,
      subjects,
      messages,
      contacts,
      linkGenerator
    );
  }

  if (!Array.isArray(labels)) {
    return createLinksInHtml_(
      contacts,
      subjects,
      messages,
      contacts.map((row) => row.map(() => labels)),
      linkGenerator
    );
  }

  return contacts.map((row, i) =>
    row.map((cell, j) => {
      const contact = cell.trim();
      return contact
        ? linkGenerator(contact, subjects[i][j], messages[i][j], labels[i][j])
        : '';
    })
  );
}

function isNullOrUndefined_(value) {
  return value === null || value === undefined;
}

function createAnchor_(url, label) {
  return `<a href="${url}">${label}</a>`;
}

function createPartitions_(grid, numPartitions) {
  let html = '';
  for (let i = 0; i < numPartitions; i++) {
    const partition = grid.slice(
      ...[i, i + 1].map((p) => p * Math.ceil(grid.length / numPartitions))
    );
    html +=
      ' <div class="col">' +
      '   <table class="table table-striped table-bordered">' +
      `     ${createRows_(partition)}` +
      '   </table>' +
      ' </div>';
  }
  return html;
}

function createRows_(partition) {
  return partition.map((row) => `<tr>${createColumns_(row)}</tr>`).join('');
}

function createColumns_(row) {
  return row.map((cell) => `<td>${cell}</td>`).join('');
}

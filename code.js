/**
 * Emboldens a given text in HTML.
 * @param {string} text The text to embolden.
 * @returns {string} The supplied text emboldened in HTML.
 * @customfunction
 */
function embolden(text) {
  return `<b>${text}</b>`;
}

/**
 * Translates an array of texts from Bengali to English.
 * @param {Array<Array>} texts The texts to translate from Bengali to English.
 * @returns {Array<Array>} The supplied texts translated from Bengali to English.
 * @customfunction
 */
function translateFromBengaliToEnglish(texts) {
  return texts.map((row) =>
    row.map((text) => LanguageApp.translate(text, 'bn', 'en'))
  );
}

/**
 * Creates DM links for an array of WhatsApp contacts in HTML.
 * @param {Array<Array>} phones The WhatsApp numbers.
 * @param {string | Array<Array>} [messages] The URL encoded message(s) to send. Must be a `string` or a grid matching the structure of `phones`.
 * @param {string | Array<Array>} [labels] The label(s) to show on the generated links. Must be a `string` or a grid matching the structure of `phones`.
 * @returns The supplied WhatsApp contacts turned into DM links with pre-filled message texts in HTML.
 * @customfunction
 */
function createWhatsAppMessageLinksInHtml(phones, messages, labels) {
  if (isNullOrUndefined(messages)) {
    return createWhatsAppMessageLinksInHtml(
      phones,
      phones.map((row) => row.map(() => '')),
      labels
    );
  }

  if (!Array.isArray(messages)) {
    return createWhatsAppMessageLinksInHtml(
      phones,
      phones.map((row) => row.map(() => messages)),
      labels
    );
  }

  if (
    phones.length != messages.length ||
    phones[0].length != messages[0].length
  ) {
    throw 'The structure of the `messages` grid must match that of `phones`.';
  }

  if (isNullOrUndefined(labels)) {
    return createWhatsAppMessageLinksInHtml(phones, messages, phones);
  }

  if (!Array.isArray(labels)) {
    return createWhatsAppMessageLinksInHtml(
      phones,
      messages,
      phones.map((row) => row.map(() => labels))
    );
  }

  if (phones.length != labels.length || phones[0].length != labels[0].length) {
    throw 'The structure of the `labels` grid must match that of `phones`.';
  }

  return phones.map((row, i) =>
    row.map((cell, j) => {
      const value = cell.trim();
      return value
        ? createAnchor_(
            `https://wa.me/${value}?text=${messages[i][j].trim()}`,
            labels[i][j]
          )
        : '';
    })
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
function createListInHtml(grid, title, numPartitions) {
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
    '   .container {' +
    '     border: 1px solid red;' +
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

function isNullOrUndefined(value) {
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

import chalk from 'chalk'

export class LogService {

  printSegments(from, to, lines, segment) {
    console.log(`
    ----- Cnab linhas ${segment} -----
    
    Posição From: ${chalk.inverse.bgBlack(from)}

    Posição To: ${chalk.inverse.bgBlack(to)}

    Item Isolado: ${chalk.inverse.bgBlack(lines[0].substring(from, to + 1))}

    Item em destaque em todos os segmentos ${segment}: 
        ${this.highlightSegmentLine(lines, from, to)}

    ----- FIM ------
    `)
  }

  printCompanies(from, to, lines, companyName, segment) {
    console.log(`
    ----- Cnab linhas com a empresa ${companyName} - Segmento: ${segment} -----
    
    Linhas encontradas: 
        ${this.highlightSegmentLine(lines, from, to)}

    ----- FIM ------
    `)
  }

  highlightSegmentLine(lines, from, to) {
    return `${lines.map(line => line.substring(0, from) + chalk.inverse.bgBlack(line.substring(from, to + 1)) + line.substring(to+1)).join('\n\t')}`
  }
}

export function parseDateInput(val: any): Date | null {
    if (val instanceof Date) {
        return isNaN(val.getTime()) ? null : val
    }
    if (typeof val === 'string') {
        const s = val.trim()
        if (!s) return null
        const ddmmyyyy = /^([0-3]\d)\/([0-1]\d)\/(\d{4})$/
        const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/
        if (ddmmyyyy.test(s)) {
            const [, dd, mm, yyyy] = s.match(ddmmyyyy) as RegExpMatchArray
            const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
            return isNaN(d.getTime()) ? null : d
        }
        if (yyyymmdd.test(s)) {
            const [, yyyy, mm, dd] = s.match(yyyymmdd) as RegExpMatchArray
            const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
            return isNaN(d.getTime()) ? null : d
        }
        const d = new Date(s)
        return isNaN(d.getTime()) ? null : d
    }
    if (typeof val === 'number') {
        const d = new Date(val)
        return isNaN(d.getTime()) ? null : d
    }
    return null
}

export function parseManyDates(values: any[]): { valid: Date[]; invalid: any[] } {
    const valid: Date[] = []
    const invalid: any[] = []
    for (const v of values) {
        const d = parseDateInput(v)
        if (d) valid.push(d)
        else invalid.push(v)
    }
    return { valid, invalid }
}

export function toStartOfYear(input: any): Date | null {
    const d = parseDateInput(input)
    if (d) {
        const year = d.getFullYear()
        return new Date(year, 0, 1)
    }
    if (typeof input === 'number') {
        return new Date(input, 0, 1)
    }
    if (typeof input === 'string') {
        const s = input.trim()
        const yearMatch = s.match(/^(\d{4})$/)
        if (yearMatch) {
            return new Date(Number(yearMatch[1]), 0, 1)
        }
        const d2 = parseDateInput(s)
        if (d2) return new Date(d2.getFullYear(), 0, 1)
    }
    return null
}

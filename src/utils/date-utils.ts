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

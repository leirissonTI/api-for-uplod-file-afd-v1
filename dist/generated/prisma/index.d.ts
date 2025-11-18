
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RegistroTipo1
 * 
 */
export type RegistroTipo1 = $Result.DefaultSelection<Prisma.$RegistroTipo1Payload>
/**
 * Model RegistroTipo10
 * 
 */
export type RegistroTipo10 = $Result.DefaultSelection<Prisma.$RegistroTipo10Payload>
/**
 * Model RegistroTipo3
 * 
 */
export type RegistroTipo3 = $Result.DefaultSelection<Prisma.$RegistroTipo3Payload>
/**
 * Model EspelhoDiario
 * 
 */
export type EspelhoDiario = $Result.DefaultSelection<Prisma.$EspelhoDiarioPayload>
/**
 * Model EspelhoMensal
 * 
 */
export type EspelhoMensal = $Result.DefaultSelection<Prisma.$EspelhoMensalPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RegistroTipo1s
 * const registroTipo1s = await prisma.registroTipo1.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RegistroTipo1s
   * const registroTipo1s = await prisma.registroTipo1.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.registroTipo1`: Exposes CRUD operations for the **RegistroTipo1** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegistroTipo1s
    * const registroTipo1s = await prisma.registroTipo1.findMany()
    * ```
    */
  get registroTipo1(): Prisma.RegistroTipo1Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registroTipo10`: Exposes CRUD operations for the **RegistroTipo10** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegistroTipo10s
    * const registroTipo10s = await prisma.registroTipo10.findMany()
    * ```
    */
  get registroTipo10(): Prisma.RegistroTipo10Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registroTipo3`: Exposes CRUD operations for the **RegistroTipo3** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegistroTipo3s
    * const registroTipo3s = await prisma.registroTipo3.findMany()
    * ```
    */
  get registroTipo3(): Prisma.RegistroTipo3Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.espelhoDiario`: Exposes CRUD operations for the **EspelhoDiario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EspelhoDiarios
    * const espelhoDiarios = await prisma.espelhoDiario.findMany()
    * ```
    */
  get espelhoDiario(): Prisma.EspelhoDiarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.espelhoMensal`: Exposes CRUD operations for the **EspelhoMensal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EspelhoMensals
    * const espelhoMensals = await prisma.espelhoMensal.findMany()
    * ```
    */
  get espelhoMensal(): Prisma.EspelhoMensalDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RegistroTipo1: 'RegistroTipo1',
    RegistroTipo10: 'RegistroTipo10',
    RegistroTipo3: 'RegistroTipo3',
    EspelhoDiario: 'EspelhoDiario',
    EspelhoMensal: 'EspelhoMensal'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "registroTipo1" | "registroTipo10" | "registroTipo3" | "espelhoDiario" | "espelhoMensal"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RegistroTipo1: {
        payload: Prisma.$RegistroTipo1Payload<ExtArgs>
        fields: Prisma.RegistroTipo1FieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistroTipo1FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistroTipo1FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>
          }
          findFirst: {
            args: Prisma.RegistroTipo1FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistroTipo1FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>
          }
          findMany: {
            args: Prisma.RegistroTipo1FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>[]
          }
          create: {
            args: Prisma.RegistroTipo1CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>
          }
          createMany: {
            args: Prisma.RegistroTipo1CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistroTipo1CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>[]
          }
          delete: {
            args: Prisma.RegistroTipo1DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>
          }
          update: {
            args: Prisma.RegistroTipo1UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>
          }
          deleteMany: {
            args: Prisma.RegistroTipo1DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistroTipo1UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistroTipo1UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>[]
          }
          upsert: {
            args: Prisma.RegistroTipo1UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo1Payload>
          }
          aggregate: {
            args: Prisma.RegistroTipo1AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistroTipo1>
          }
          groupBy: {
            args: Prisma.RegistroTipo1GroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistroTipo1GroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistroTipo1CountArgs<ExtArgs>
            result: $Utils.Optional<RegistroTipo1CountAggregateOutputType> | number
          }
        }
      }
      RegistroTipo10: {
        payload: Prisma.$RegistroTipo10Payload<ExtArgs>
        fields: Prisma.RegistroTipo10FieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistroTipo10FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistroTipo10FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>
          }
          findFirst: {
            args: Prisma.RegistroTipo10FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistroTipo10FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>
          }
          findMany: {
            args: Prisma.RegistroTipo10FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>[]
          }
          create: {
            args: Prisma.RegistroTipo10CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>
          }
          createMany: {
            args: Prisma.RegistroTipo10CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistroTipo10CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>[]
          }
          delete: {
            args: Prisma.RegistroTipo10DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>
          }
          update: {
            args: Prisma.RegistroTipo10UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>
          }
          deleteMany: {
            args: Prisma.RegistroTipo10DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistroTipo10UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistroTipo10UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>[]
          }
          upsert: {
            args: Prisma.RegistroTipo10UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo10Payload>
          }
          aggregate: {
            args: Prisma.RegistroTipo10AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistroTipo10>
          }
          groupBy: {
            args: Prisma.RegistroTipo10GroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistroTipo10GroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistroTipo10CountArgs<ExtArgs>
            result: $Utils.Optional<RegistroTipo10CountAggregateOutputType> | number
          }
        }
      }
      RegistroTipo3: {
        payload: Prisma.$RegistroTipo3Payload<ExtArgs>
        fields: Prisma.RegistroTipo3FieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistroTipo3FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistroTipo3FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>
          }
          findFirst: {
            args: Prisma.RegistroTipo3FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistroTipo3FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>
          }
          findMany: {
            args: Prisma.RegistroTipo3FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>[]
          }
          create: {
            args: Prisma.RegistroTipo3CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>
          }
          createMany: {
            args: Prisma.RegistroTipo3CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistroTipo3CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>[]
          }
          delete: {
            args: Prisma.RegistroTipo3DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>
          }
          update: {
            args: Prisma.RegistroTipo3UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>
          }
          deleteMany: {
            args: Prisma.RegistroTipo3DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistroTipo3UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistroTipo3UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>[]
          }
          upsert: {
            args: Prisma.RegistroTipo3UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistroTipo3Payload>
          }
          aggregate: {
            args: Prisma.RegistroTipo3AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistroTipo3>
          }
          groupBy: {
            args: Prisma.RegistroTipo3GroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistroTipo3GroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistroTipo3CountArgs<ExtArgs>
            result: $Utils.Optional<RegistroTipo3CountAggregateOutputType> | number
          }
        }
      }
      EspelhoDiario: {
        payload: Prisma.$EspelhoDiarioPayload<ExtArgs>
        fields: Prisma.EspelhoDiarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EspelhoDiarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EspelhoDiarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>
          }
          findFirst: {
            args: Prisma.EspelhoDiarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EspelhoDiarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>
          }
          findMany: {
            args: Prisma.EspelhoDiarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>[]
          }
          create: {
            args: Prisma.EspelhoDiarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>
          }
          createMany: {
            args: Prisma.EspelhoDiarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EspelhoDiarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>[]
          }
          delete: {
            args: Prisma.EspelhoDiarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>
          }
          update: {
            args: Prisma.EspelhoDiarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>
          }
          deleteMany: {
            args: Prisma.EspelhoDiarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EspelhoDiarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EspelhoDiarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>[]
          }
          upsert: {
            args: Prisma.EspelhoDiarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoDiarioPayload>
          }
          aggregate: {
            args: Prisma.EspelhoDiarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEspelhoDiario>
          }
          groupBy: {
            args: Prisma.EspelhoDiarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<EspelhoDiarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.EspelhoDiarioCountArgs<ExtArgs>
            result: $Utils.Optional<EspelhoDiarioCountAggregateOutputType> | number
          }
        }
      }
      EspelhoMensal: {
        payload: Prisma.$EspelhoMensalPayload<ExtArgs>
        fields: Prisma.EspelhoMensalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EspelhoMensalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EspelhoMensalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>
          }
          findFirst: {
            args: Prisma.EspelhoMensalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EspelhoMensalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>
          }
          findMany: {
            args: Prisma.EspelhoMensalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>[]
          }
          create: {
            args: Prisma.EspelhoMensalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>
          }
          createMany: {
            args: Prisma.EspelhoMensalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EspelhoMensalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>[]
          }
          delete: {
            args: Prisma.EspelhoMensalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>
          }
          update: {
            args: Prisma.EspelhoMensalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>
          }
          deleteMany: {
            args: Prisma.EspelhoMensalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EspelhoMensalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EspelhoMensalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>[]
          }
          upsert: {
            args: Prisma.EspelhoMensalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspelhoMensalPayload>
          }
          aggregate: {
            args: Prisma.EspelhoMensalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEspelhoMensal>
          }
          groupBy: {
            args: Prisma.EspelhoMensalGroupByArgs<ExtArgs>
            result: $Utils.Optional<EspelhoMensalGroupByOutputType>[]
          }
          count: {
            args: Prisma.EspelhoMensalCountArgs<ExtArgs>
            result: $Utils.Optional<EspelhoMensalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    registroTipo1?: RegistroTipo1Omit
    registroTipo10?: RegistroTipo10Omit
    registroTipo3?: RegistroTipo3Omit
    espelhoDiario?: EspelhoDiarioOmit
    espelhoMensal?: EspelhoMensalOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EspelhoDiarioCountOutputType
   */

  export type EspelhoDiarioCountOutputType = {
    EspelhoMensal: number
  }

  export type EspelhoDiarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    EspelhoMensal?: boolean | EspelhoDiarioCountOutputTypeCountEspelhoMensalArgs
  }

  // Custom InputTypes
  /**
   * EspelhoDiarioCountOutputType without action
   */
  export type EspelhoDiarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiarioCountOutputType
     */
    select?: EspelhoDiarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EspelhoDiarioCountOutputType without action
   */
  export type EspelhoDiarioCountOutputTypeCountEspelhoMensalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EspelhoMensalWhereInput
  }


  /**
   * Count Type EspelhoMensalCountOutputType
   */

  export type EspelhoMensalCountOutputType = {
    registros: number
  }

  export type EspelhoMensalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registros?: boolean | EspelhoMensalCountOutputTypeCountRegistrosArgs
  }

  // Custom InputTypes
  /**
   * EspelhoMensalCountOutputType without action
   */
  export type EspelhoMensalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensalCountOutputType
     */
    select?: EspelhoMensalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EspelhoMensalCountOutputType without action
   */
  export type EspelhoMensalCountOutputTypeCountRegistrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EspelhoDiarioWhereInput
  }


  /**
   * Models
   */

  /**
   * Model RegistroTipo1
   */

  export type AggregateRegistroTipo1 = {
    _count: RegistroTipo1CountAggregateOutputType | null
    _min: RegistroTipo1MinAggregateOutputType | null
    _max: RegistroTipo1MaxAggregateOutputType | null
  }

  export type RegistroTipo1MinAggregateOutputType = {
    id: string | null
    tipo: string | null
    idSequencial: string | null
    tipoIdentificadorEmpregador: string | null
    cnpjCpfEmpregador: string | null
    cnoCaepf: string | null
    razaoSocial: string | null
    numeroFabricacao: string | null
    dataInicial: string | null
    dataFinal: string | null
    dataHoraGeracao: string | null
    versaoLayout: string | null
    tipoIdentificadorFabricante: string | null
    cnpjCpfFabricante: string | null
    modelo: string | null
    crc: string | null
    origem: string | null
  }

  export type RegistroTipo1MaxAggregateOutputType = {
    id: string | null
    tipo: string | null
    idSequencial: string | null
    tipoIdentificadorEmpregador: string | null
    cnpjCpfEmpregador: string | null
    cnoCaepf: string | null
    razaoSocial: string | null
    numeroFabricacao: string | null
    dataInicial: string | null
    dataFinal: string | null
    dataHoraGeracao: string | null
    versaoLayout: string | null
    tipoIdentificadorFabricante: string | null
    cnpjCpfFabricante: string | null
    modelo: string | null
    crc: string | null
    origem: string | null
  }

  export type RegistroTipo1CountAggregateOutputType = {
    id: number
    tipo: number
    idSequencial: number
    tipoIdentificadorEmpregador: number
    cnpjCpfEmpregador: number
    cnoCaepf: number
    razaoSocial: number
    numeroFabricacao: number
    dataInicial: number
    dataFinal: number
    dataHoraGeracao: number
    versaoLayout: number
    tipoIdentificadorFabricante: number
    cnpjCpfFabricante: number
    modelo: number
    crc: number
    origem: number
    _all: number
  }


  export type RegistroTipo1MinAggregateInputType = {
    id?: true
    tipo?: true
    idSequencial?: true
    tipoIdentificadorEmpregador?: true
    cnpjCpfEmpregador?: true
    cnoCaepf?: true
    razaoSocial?: true
    numeroFabricacao?: true
    dataInicial?: true
    dataFinal?: true
    dataHoraGeracao?: true
    versaoLayout?: true
    tipoIdentificadorFabricante?: true
    cnpjCpfFabricante?: true
    modelo?: true
    crc?: true
    origem?: true
  }

  export type RegistroTipo1MaxAggregateInputType = {
    id?: true
    tipo?: true
    idSequencial?: true
    tipoIdentificadorEmpregador?: true
    cnpjCpfEmpregador?: true
    cnoCaepf?: true
    razaoSocial?: true
    numeroFabricacao?: true
    dataInicial?: true
    dataFinal?: true
    dataHoraGeracao?: true
    versaoLayout?: true
    tipoIdentificadorFabricante?: true
    cnpjCpfFabricante?: true
    modelo?: true
    crc?: true
    origem?: true
  }

  export type RegistroTipo1CountAggregateInputType = {
    id?: true
    tipo?: true
    idSequencial?: true
    tipoIdentificadorEmpregador?: true
    cnpjCpfEmpregador?: true
    cnoCaepf?: true
    razaoSocial?: true
    numeroFabricacao?: true
    dataInicial?: true
    dataFinal?: true
    dataHoraGeracao?: true
    versaoLayout?: true
    tipoIdentificadorFabricante?: true
    cnpjCpfFabricante?: true
    modelo?: true
    crc?: true
    origem?: true
    _all?: true
  }

  export type RegistroTipo1AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroTipo1 to aggregate.
     */
    where?: RegistroTipo1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo1s to fetch.
     */
    orderBy?: RegistroTipo1OrderByWithRelationInput | RegistroTipo1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistroTipo1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo1s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegistroTipo1s
    **/
    _count?: true | RegistroTipo1CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistroTipo1MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistroTipo1MaxAggregateInputType
  }

  export type GetRegistroTipo1AggregateType<T extends RegistroTipo1AggregateArgs> = {
        [P in keyof T & keyof AggregateRegistroTipo1]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistroTipo1[P]>
      : GetScalarType<T[P], AggregateRegistroTipo1[P]>
  }




  export type RegistroTipo1GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistroTipo1WhereInput
    orderBy?: RegistroTipo1OrderByWithAggregationInput | RegistroTipo1OrderByWithAggregationInput[]
    by: RegistroTipo1ScalarFieldEnum[] | RegistroTipo1ScalarFieldEnum
    having?: RegistroTipo1ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistroTipo1CountAggregateInputType | true
    _min?: RegistroTipo1MinAggregateInputType
    _max?: RegistroTipo1MaxAggregateInputType
  }

  export type RegistroTipo1GroupByOutputType = {
    id: string
    tipo: string
    idSequencial: string
    tipoIdentificadorEmpregador: string
    cnpjCpfEmpregador: string
    cnoCaepf: string
    razaoSocial: string
    numeroFabricacao: string
    dataInicial: string
    dataFinal: string
    dataHoraGeracao: string
    versaoLayout: string
    tipoIdentificadorFabricante: string
    cnpjCpfFabricante: string
    modelo: string
    crc: string
    origem: string | null
    _count: RegistroTipo1CountAggregateOutputType | null
    _min: RegistroTipo1MinAggregateOutputType | null
    _max: RegistroTipo1MaxAggregateOutputType | null
  }

  type GetRegistroTipo1GroupByPayload<T extends RegistroTipo1GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistroTipo1GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistroTipo1GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistroTipo1GroupByOutputType[P]>
            : GetScalarType<T[P], RegistroTipo1GroupByOutputType[P]>
        }
      >
    >


  export type RegistroTipo1Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    idSequencial?: boolean
    tipoIdentificadorEmpregador?: boolean
    cnpjCpfEmpregador?: boolean
    cnoCaepf?: boolean
    razaoSocial?: boolean
    numeroFabricacao?: boolean
    dataInicial?: boolean
    dataFinal?: boolean
    dataHoraGeracao?: boolean
    versaoLayout?: boolean
    tipoIdentificadorFabricante?: boolean
    cnpjCpfFabricante?: boolean
    modelo?: boolean
    crc?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo1"]>

  export type RegistroTipo1SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    idSequencial?: boolean
    tipoIdentificadorEmpregador?: boolean
    cnpjCpfEmpregador?: boolean
    cnoCaepf?: boolean
    razaoSocial?: boolean
    numeroFabricacao?: boolean
    dataInicial?: boolean
    dataFinal?: boolean
    dataHoraGeracao?: boolean
    versaoLayout?: boolean
    tipoIdentificadorFabricante?: boolean
    cnpjCpfFabricante?: boolean
    modelo?: boolean
    crc?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo1"]>

  export type RegistroTipo1SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo?: boolean
    idSequencial?: boolean
    tipoIdentificadorEmpregador?: boolean
    cnpjCpfEmpregador?: boolean
    cnoCaepf?: boolean
    razaoSocial?: boolean
    numeroFabricacao?: boolean
    dataInicial?: boolean
    dataFinal?: boolean
    dataHoraGeracao?: boolean
    versaoLayout?: boolean
    tipoIdentificadorFabricante?: boolean
    cnpjCpfFabricante?: boolean
    modelo?: boolean
    crc?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo1"]>

  export type RegistroTipo1SelectScalar = {
    id?: boolean
    tipo?: boolean
    idSequencial?: boolean
    tipoIdentificadorEmpregador?: boolean
    cnpjCpfEmpregador?: boolean
    cnoCaepf?: boolean
    razaoSocial?: boolean
    numeroFabricacao?: boolean
    dataInicial?: boolean
    dataFinal?: boolean
    dataHoraGeracao?: boolean
    versaoLayout?: boolean
    tipoIdentificadorFabricante?: boolean
    cnpjCpfFabricante?: boolean
    modelo?: boolean
    crc?: boolean
    origem?: boolean
  }

  export type RegistroTipo1Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo" | "idSequencial" | "tipoIdentificadorEmpregador" | "cnpjCpfEmpregador" | "cnoCaepf" | "razaoSocial" | "numeroFabricacao" | "dataInicial" | "dataFinal" | "dataHoraGeracao" | "versaoLayout" | "tipoIdentificadorFabricante" | "cnpjCpfFabricante" | "modelo" | "crc" | "origem", ExtArgs["result"]["registroTipo1"]>

  export type $RegistroTipo1Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegistroTipo1"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipo: string
      idSequencial: string
      tipoIdentificadorEmpregador: string
      cnpjCpfEmpregador: string
      cnoCaepf: string
      razaoSocial: string
      numeroFabricacao: string
      dataInicial: string
      dataFinal: string
      dataHoraGeracao: string
      versaoLayout: string
      tipoIdentificadorFabricante: string
      cnpjCpfFabricante: string
      modelo: string
      crc: string
      origem: string | null
    }, ExtArgs["result"]["registroTipo1"]>
    composites: {}
  }

  type RegistroTipo1GetPayload<S extends boolean | null | undefined | RegistroTipo1DefaultArgs> = $Result.GetResult<Prisma.$RegistroTipo1Payload, S>

  type RegistroTipo1CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistroTipo1FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistroTipo1CountAggregateInputType | true
    }

  export interface RegistroTipo1Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegistroTipo1'], meta: { name: 'RegistroTipo1' } }
    /**
     * Find zero or one RegistroTipo1 that matches the filter.
     * @param {RegistroTipo1FindUniqueArgs} args - Arguments to find a RegistroTipo1
     * @example
     * // Get one RegistroTipo1
     * const registroTipo1 = await prisma.registroTipo1.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistroTipo1FindUniqueArgs>(args: SelectSubset<T, RegistroTipo1FindUniqueArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegistroTipo1 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistroTipo1FindUniqueOrThrowArgs} args - Arguments to find a RegistroTipo1
     * @example
     * // Get one RegistroTipo1
     * const registroTipo1 = await prisma.registroTipo1.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistroTipo1FindUniqueOrThrowArgs>(args: SelectSubset<T, RegistroTipo1FindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistroTipo1 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1FindFirstArgs} args - Arguments to find a RegistroTipo1
     * @example
     * // Get one RegistroTipo1
     * const registroTipo1 = await prisma.registroTipo1.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistroTipo1FindFirstArgs>(args?: SelectSubset<T, RegistroTipo1FindFirstArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistroTipo1 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1FindFirstOrThrowArgs} args - Arguments to find a RegistroTipo1
     * @example
     * // Get one RegistroTipo1
     * const registroTipo1 = await prisma.registroTipo1.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistroTipo1FindFirstOrThrowArgs>(args?: SelectSubset<T, RegistroTipo1FindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegistroTipo1s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistroTipo1s
     * const registroTipo1s = await prisma.registroTipo1.findMany()
     * 
     * // Get first 10 RegistroTipo1s
     * const registroTipo1s = await prisma.registroTipo1.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registroTipo1WithIdOnly = await prisma.registroTipo1.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistroTipo1FindManyArgs>(args?: SelectSubset<T, RegistroTipo1FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegistroTipo1.
     * @param {RegistroTipo1CreateArgs} args - Arguments to create a RegistroTipo1.
     * @example
     * // Create one RegistroTipo1
     * const RegistroTipo1 = await prisma.registroTipo1.create({
     *   data: {
     *     // ... data to create a RegistroTipo1
     *   }
     * })
     * 
     */
    create<T extends RegistroTipo1CreateArgs>(args: SelectSubset<T, RegistroTipo1CreateArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegistroTipo1s.
     * @param {RegistroTipo1CreateManyArgs} args - Arguments to create many RegistroTipo1s.
     * @example
     * // Create many RegistroTipo1s
     * const registroTipo1 = await prisma.registroTipo1.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistroTipo1CreateManyArgs>(args?: SelectSubset<T, RegistroTipo1CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegistroTipo1s and returns the data saved in the database.
     * @param {RegistroTipo1CreateManyAndReturnArgs} args - Arguments to create many RegistroTipo1s.
     * @example
     * // Create many RegistroTipo1s
     * const registroTipo1 = await prisma.registroTipo1.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegistroTipo1s and only return the `id`
     * const registroTipo1WithIdOnly = await prisma.registroTipo1.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistroTipo1CreateManyAndReturnArgs>(args?: SelectSubset<T, RegistroTipo1CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegistroTipo1.
     * @param {RegistroTipo1DeleteArgs} args - Arguments to delete one RegistroTipo1.
     * @example
     * // Delete one RegistroTipo1
     * const RegistroTipo1 = await prisma.registroTipo1.delete({
     *   where: {
     *     // ... filter to delete one RegistroTipo1
     *   }
     * })
     * 
     */
    delete<T extends RegistroTipo1DeleteArgs>(args: SelectSubset<T, RegistroTipo1DeleteArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegistroTipo1.
     * @param {RegistroTipo1UpdateArgs} args - Arguments to update one RegistroTipo1.
     * @example
     * // Update one RegistroTipo1
     * const registroTipo1 = await prisma.registroTipo1.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistroTipo1UpdateArgs>(args: SelectSubset<T, RegistroTipo1UpdateArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegistroTipo1s.
     * @param {RegistroTipo1DeleteManyArgs} args - Arguments to filter RegistroTipo1s to delete.
     * @example
     * // Delete a few RegistroTipo1s
     * const { count } = await prisma.registroTipo1.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistroTipo1DeleteManyArgs>(args?: SelectSubset<T, RegistroTipo1DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroTipo1s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistroTipo1s
     * const registroTipo1 = await prisma.registroTipo1.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistroTipo1UpdateManyArgs>(args: SelectSubset<T, RegistroTipo1UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroTipo1s and returns the data updated in the database.
     * @param {RegistroTipo1UpdateManyAndReturnArgs} args - Arguments to update many RegistroTipo1s.
     * @example
     * // Update many RegistroTipo1s
     * const registroTipo1 = await prisma.registroTipo1.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegistroTipo1s and only return the `id`
     * const registroTipo1WithIdOnly = await prisma.registroTipo1.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistroTipo1UpdateManyAndReturnArgs>(args: SelectSubset<T, RegistroTipo1UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegistroTipo1.
     * @param {RegistroTipo1UpsertArgs} args - Arguments to update or create a RegistroTipo1.
     * @example
     * // Update or create a RegistroTipo1
     * const registroTipo1 = await prisma.registroTipo1.upsert({
     *   create: {
     *     // ... data to create a RegistroTipo1
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistroTipo1 we want to update
     *   }
     * })
     */
    upsert<T extends RegistroTipo1UpsertArgs>(args: SelectSubset<T, RegistroTipo1UpsertArgs<ExtArgs>>): Prisma__RegistroTipo1Client<$Result.GetResult<Prisma.$RegistroTipo1Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegistroTipo1s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1CountArgs} args - Arguments to filter RegistroTipo1s to count.
     * @example
     * // Count the number of RegistroTipo1s
     * const count = await prisma.registroTipo1.count({
     *   where: {
     *     // ... the filter for the RegistroTipo1s we want to count
     *   }
     * })
    **/
    count<T extends RegistroTipo1CountArgs>(
      args?: Subset<T, RegistroTipo1CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistroTipo1CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegistroTipo1.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistroTipo1AggregateArgs>(args: Subset<T, RegistroTipo1AggregateArgs>): Prisma.PrismaPromise<GetRegistroTipo1AggregateType<T>>

    /**
     * Group by RegistroTipo1.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo1GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistroTipo1GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistroTipo1GroupByArgs['orderBy'] }
        : { orderBy?: RegistroTipo1GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistroTipo1GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistroTipo1GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegistroTipo1 model
   */
  readonly fields: RegistroTipo1FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegistroTipo1.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistroTipo1Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegistroTipo1 model
   */
  interface RegistroTipo1FieldRefs {
    readonly id: FieldRef<"RegistroTipo1", 'String'>
    readonly tipo: FieldRef<"RegistroTipo1", 'String'>
    readonly idSequencial: FieldRef<"RegistroTipo1", 'String'>
    readonly tipoIdentificadorEmpregador: FieldRef<"RegistroTipo1", 'String'>
    readonly cnpjCpfEmpregador: FieldRef<"RegistroTipo1", 'String'>
    readonly cnoCaepf: FieldRef<"RegistroTipo1", 'String'>
    readonly razaoSocial: FieldRef<"RegistroTipo1", 'String'>
    readonly numeroFabricacao: FieldRef<"RegistroTipo1", 'String'>
    readonly dataInicial: FieldRef<"RegistroTipo1", 'String'>
    readonly dataFinal: FieldRef<"RegistroTipo1", 'String'>
    readonly dataHoraGeracao: FieldRef<"RegistroTipo1", 'String'>
    readonly versaoLayout: FieldRef<"RegistroTipo1", 'String'>
    readonly tipoIdentificadorFabricante: FieldRef<"RegistroTipo1", 'String'>
    readonly cnpjCpfFabricante: FieldRef<"RegistroTipo1", 'String'>
    readonly modelo: FieldRef<"RegistroTipo1", 'String'>
    readonly crc: FieldRef<"RegistroTipo1", 'String'>
    readonly origem: FieldRef<"RegistroTipo1", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RegistroTipo1 findUnique
   */
  export type RegistroTipo1FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo1 to fetch.
     */
    where: RegistroTipo1WhereUniqueInput
  }

  /**
   * RegistroTipo1 findUniqueOrThrow
   */
  export type RegistroTipo1FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo1 to fetch.
     */
    where: RegistroTipo1WhereUniqueInput
  }

  /**
   * RegistroTipo1 findFirst
   */
  export type RegistroTipo1FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo1 to fetch.
     */
    where?: RegistroTipo1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo1s to fetch.
     */
    orderBy?: RegistroTipo1OrderByWithRelationInput | RegistroTipo1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroTipo1s.
     */
    cursor?: RegistroTipo1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo1s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroTipo1s.
     */
    distinct?: RegistroTipo1ScalarFieldEnum | RegistroTipo1ScalarFieldEnum[]
  }

  /**
   * RegistroTipo1 findFirstOrThrow
   */
  export type RegistroTipo1FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo1 to fetch.
     */
    where?: RegistroTipo1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo1s to fetch.
     */
    orderBy?: RegistroTipo1OrderByWithRelationInput | RegistroTipo1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroTipo1s.
     */
    cursor?: RegistroTipo1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo1s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroTipo1s.
     */
    distinct?: RegistroTipo1ScalarFieldEnum | RegistroTipo1ScalarFieldEnum[]
  }

  /**
   * RegistroTipo1 findMany
   */
  export type RegistroTipo1FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo1s to fetch.
     */
    where?: RegistroTipo1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo1s to fetch.
     */
    orderBy?: RegistroTipo1OrderByWithRelationInput | RegistroTipo1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegistroTipo1s.
     */
    cursor?: RegistroTipo1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo1s.
     */
    skip?: number
    distinct?: RegistroTipo1ScalarFieldEnum | RegistroTipo1ScalarFieldEnum[]
  }

  /**
   * RegistroTipo1 create
   */
  export type RegistroTipo1CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * The data needed to create a RegistroTipo1.
     */
    data: XOR<RegistroTipo1CreateInput, RegistroTipo1UncheckedCreateInput>
  }

  /**
   * RegistroTipo1 createMany
   */
  export type RegistroTipo1CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistroTipo1s.
     */
    data: RegistroTipo1CreateManyInput | RegistroTipo1CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroTipo1 createManyAndReturn
   */
  export type RegistroTipo1CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * The data used to create many RegistroTipo1s.
     */
    data: RegistroTipo1CreateManyInput | RegistroTipo1CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroTipo1 update
   */
  export type RegistroTipo1UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * The data needed to update a RegistroTipo1.
     */
    data: XOR<RegistroTipo1UpdateInput, RegistroTipo1UncheckedUpdateInput>
    /**
     * Choose, which RegistroTipo1 to update.
     */
    where: RegistroTipo1WhereUniqueInput
  }

  /**
   * RegistroTipo1 updateMany
   */
  export type RegistroTipo1UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistroTipo1s.
     */
    data: XOR<RegistroTipo1UpdateManyMutationInput, RegistroTipo1UncheckedUpdateManyInput>
    /**
     * Filter which RegistroTipo1s to update
     */
    where?: RegistroTipo1WhereInput
    /**
     * Limit how many RegistroTipo1s to update.
     */
    limit?: number
  }

  /**
   * RegistroTipo1 updateManyAndReturn
   */
  export type RegistroTipo1UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * The data used to update RegistroTipo1s.
     */
    data: XOR<RegistroTipo1UpdateManyMutationInput, RegistroTipo1UncheckedUpdateManyInput>
    /**
     * Filter which RegistroTipo1s to update
     */
    where?: RegistroTipo1WhereInput
    /**
     * Limit how many RegistroTipo1s to update.
     */
    limit?: number
  }

  /**
   * RegistroTipo1 upsert
   */
  export type RegistroTipo1UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * The filter to search for the RegistroTipo1 to update in case it exists.
     */
    where: RegistroTipo1WhereUniqueInput
    /**
     * In case the RegistroTipo1 found by the `where` argument doesn't exist, create a new RegistroTipo1 with this data.
     */
    create: XOR<RegistroTipo1CreateInput, RegistroTipo1UncheckedCreateInput>
    /**
     * In case the RegistroTipo1 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistroTipo1UpdateInput, RegistroTipo1UncheckedUpdateInput>
  }

  /**
   * RegistroTipo1 delete
   */
  export type RegistroTipo1DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
    /**
     * Filter which RegistroTipo1 to delete.
     */
    where: RegistroTipo1WhereUniqueInput
  }

  /**
   * RegistroTipo1 deleteMany
   */
  export type RegistroTipo1DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroTipo1s to delete
     */
    where?: RegistroTipo1WhereInput
    /**
     * Limit how many RegistroTipo1s to delete.
     */
    limit?: number
  }

  /**
   * RegistroTipo1 without action
   */
  export type RegistroTipo1DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo1
     */
    select?: RegistroTipo1Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo1
     */
    omit?: RegistroTipo1Omit<ExtArgs> | null
  }


  /**
   * Model RegistroTipo10
   */

  export type AggregateRegistroTipo10 = {
    _count: RegistroTipo10CountAggregateOutputType | null
    _avg: RegistroTipo10AvgAggregateOutputType | null
    _sum: RegistroTipo10SumAggregateOutputType | null
    _min: RegistroTipo10MinAggregateOutputType | null
    _max: RegistroTipo10MaxAggregateOutputType | null
  }

  export type RegistroTipo10AvgAggregateOutputType = {
    ultimo_nsr: number | null
  }

  export type RegistroTipo10SumAggregateOutputType = {
    ultimo_nsr: number | null
  }

  export type RegistroTipo10MinAggregateOutputType = {
    id: string | null
    ultimo_nsr: number | null
    origem: string | null
  }

  export type RegistroTipo10MaxAggregateOutputType = {
    id: string | null
    ultimo_nsr: number | null
    origem: string | null
  }

  export type RegistroTipo10CountAggregateOutputType = {
    id: number
    ultimo_nsr: number
    origem: number
    _all: number
  }


  export type RegistroTipo10AvgAggregateInputType = {
    ultimo_nsr?: true
  }

  export type RegistroTipo10SumAggregateInputType = {
    ultimo_nsr?: true
  }

  export type RegistroTipo10MinAggregateInputType = {
    id?: true
    ultimo_nsr?: true
    origem?: true
  }

  export type RegistroTipo10MaxAggregateInputType = {
    id?: true
    ultimo_nsr?: true
    origem?: true
  }

  export type RegistroTipo10CountAggregateInputType = {
    id?: true
    ultimo_nsr?: true
    origem?: true
    _all?: true
  }

  export type RegistroTipo10AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroTipo10 to aggregate.
     */
    where?: RegistroTipo10WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo10s to fetch.
     */
    orderBy?: RegistroTipo10OrderByWithRelationInput | RegistroTipo10OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistroTipo10WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo10s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo10s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegistroTipo10s
    **/
    _count?: true | RegistroTipo10CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistroTipo10AvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistroTipo10SumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistroTipo10MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistroTipo10MaxAggregateInputType
  }

  export type GetRegistroTipo10AggregateType<T extends RegistroTipo10AggregateArgs> = {
        [P in keyof T & keyof AggregateRegistroTipo10]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistroTipo10[P]>
      : GetScalarType<T[P], AggregateRegistroTipo10[P]>
  }




  export type RegistroTipo10GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistroTipo10WhereInput
    orderBy?: RegistroTipo10OrderByWithAggregationInput | RegistroTipo10OrderByWithAggregationInput[]
    by: RegistroTipo10ScalarFieldEnum[] | RegistroTipo10ScalarFieldEnum
    having?: RegistroTipo10ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistroTipo10CountAggregateInputType | true
    _avg?: RegistroTipo10AvgAggregateInputType
    _sum?: RegistroTipo10SumAggregateInputType
    _min?: RegistroTipo10MinAggregateInputType
    _max?: RegistroTipo10MaxAggregateInputType
  }

  export type RegistroTipo10GroupByOutputType = {
    id: string
    ultimo_nsr: number
    origem: string
    _count: RegistroTipo10CountAggregateOutputType | null
    _avg: RegistroTipo10AvgAggregateOutputType | null
    _sum: RegistroTipo10SumAggregateOutputType | null
    _min: RegistroTipo10MinAggregateOutputType | null
    _max: RegistroTipo10MaxAggregateOutputType | null
  }

  type GetRegistroTipo10GroupByPayload<T extends RegistroTipo10GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistroTipo10GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistroTipo10GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistroTipo10GroupByOutputType[P]>
            : GetScalarType<T[P], RegistroTipo10GroupByOutputType[P]>
        }
      >
    >


  export type RegistroTipo10Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ultimo_nsr?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo10"]>

  export type RegistroTipo10SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ultimo_nsr?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo10"]>

  export type RegistroTipo10SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ultimo_nsr?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo10"]>

  export type RegistroTipo10SelectScalar = {
    id?: boolean
    ultimo_nsr?: boolean
    origem?: boolean
  }

  export type RegistroTipo10Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ultimo_nsr" | "origem", ExtArgs["result"]["registroTipo10"]>

  export type $RegistroTipo10Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegistroTipo10"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ultimo_nsr: number
      origem: string
    }, ExtArgs["result"]["registroTipo10"]>
    composites: {}
  }

  type RegistroTipo10GetPayload<S extends boolean | null | undefined | RegistroTipo10DefaultArgs> = $Result.GetResult<Prisma.$RegistroTipo10Payload, S>

  type RegistroTipo10CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistroTipo10FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistroTipo10CountAggregateInputType | true
    }

  export interface RegistroTipo10Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegistroTipo10'], meta: { name: 'RegistroTipo10' } }
    /**
     * Find zero or one RegistroTipo10 that matches the filter.
     * @param {RegistroTipo10FindUniqueArgs} args - Arguments to find a RegistroTipo10
     * @example
     * // Get one RegistroTipo10
     * const registroTipo10 = await prisma.registroTipo10.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistroTipo10FindUniqueArgs>(args: SelectSubset<T, RegistroTipo10FindUniqueArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegistroTipo10 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistroTipo10FindUniqueOrThrowArgs} args - Arguments to find a RegistroTipo10
     * @example
     * // Get one RegistroTipo10
     * const registroTipo10 = await prisma.registroTipo10.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistroTipo10FindUniqueOrThrowArgs>(args: SelectSubset<T, RegistroTipo10FindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistroTipo10 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10FindFirstArgs} args - Arguments to find a RegistroTipo10
     * @example
     * // Get one RegistroTipo10
     * const registroTipo10 = await prisma.registroTipo10.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistroTipo10FindFirstArgs>(args?: SelectSubset<T, RegistroTipo10FindFirstArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistroTipo10 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10FindFirstOrThrowArgs} args - Arguments to find a RegistroTipo10
     * @example
     * // Get one RegistroTipo10
     * const registroTipo10 = await prisma.registroTipo10.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistroTipo10FindFirstOrThrowArgs>(args?: SelectSubset<T, RegistroTipo10FindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegistroTipo10s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistroTipo10s
     * const registroTipo10s = await prisma.registroTipo10.findMany()
     * 
     * // Get first 10 RegistroTipo10s
     * const registroTipo10s = await prisma.registroTipo10.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registroTipo10WithIdOnly = await prisma.registroTipo10.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistroTipo10FindManyArgs>(args?: SelectSubset<T, RegistroTipo10FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegistroTipo10.
     * @param {RegistroTipo10CreateArgs} args - Arguments to create a RegistroTipo10.
     * @example
     * // Create one RegistroTipo10
     * const RegistroTipo10 = await prisma.registroTipo10.create({
     *   data: {
     *     // ... data to create a RegistroTipo10
     *   }
     * })
     * 
     */
    create<T extends RegistroTipo10CreateArgs>(args: SelectSubset<T, RegistroTipo10CreateArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegistroTipo10s.
     * @param {RegistroTipo10CreateManyArgs} args - Arguments to create many RegistroTipo10s.
     * @example
     * // Create many RegistroTipo10s
     * const registroTipo10 = await prisma.registroTipo10.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistroTipo10CreateManyArgs>(args?: SelectSubset<T, RegistroTipo10CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegistroTipo10s and returns the data saved in the database.
     * @param {RegistroTipo10CreateManyAndReturnArgs} args - Arguments to create many RegistroTipo10s.
     * @example
     * // Create many RegistroTipo10s
     * const registroTipo10 = await prisma.registroTipo10.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegistroTipo10s and only return the `id`
     * const registroTipo10WithIdOnly = await prisma.registroTipo10.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistroTipo10CreateManyAndReturnArgs>(args?: SelectSubset<T, RegistroTipo10CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegistroTipo10.
     * @param {RegistroTipo10DeleteArgs} args - Arguments to delete one RegistroTipo10.
     * @example
     * // Delete one RegistroTipo10
     * const RegistroTipo10 = await prisma.registroTipo10.delete({
     *   where: {
     *     // ... filter to delete one RegistroTipo10
     *   }
     * })
     * 
     */
    delete<T extends RegistroTipo10DeleteArgs>(args: SelectSubset<T, RegistroTipo10DeleteArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegistroTipo10.
     * @param {RegistroTipo10UpdateArgs} args - Arguments to update one RegistroTipo10.
     * @example
     * // Update one RegistroTipo10
     * const registroTipo10 = await prisma.registroTipo10.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistroTipo10UpdateArgs>(args: SelectSubset<T, RegistroTipo10UpdateArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegistroTipo10s.
     * @param {RegistroTipo10DeleteManyArgs} args - Arguments to filter RegistroTipo10s to delete.
     * @example
     * // Delete a few RegistroTipo10s
     * const { count } = await prisma.registroTipo10.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistroTipo10DeleteManyArgs>(args?: SelectSubset<T, RegistroTipo10DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroTipo10s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistroTipo10s
     * const registroTipo10 = await prisma.registroTipo10.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistroTipo10UpdateManyArgs>(args: SelectSubset<T, RegistroTipo10UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroTipo10s and returns the data updated in the database.
     * @param {RegistroTipo10UpdateManyAndReturnArgs} args - Arguments to update many RegistroTipo10s.
     * @example
     * // Update many RegistroTipo10s
     * const registroTipo10 = await prisma.registroTipo10.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegistroTipo10s and only return the `id`
     * const registroTipo10WithIdOnly = await prisma.registroTipo10.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistroTipo10UpdateManyAndReturnArgs>(args: SelectSubset<T, RegistroTipo10UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegistroTipo10.
     * @param {RegistroTipo10UpsertArgs} args - Arguments to update or create a RegistroTipo10.
     * @example
     * // Update or create a RegistroTipo10
     * const registroTipo10 = await prisma.registroTipo10.upsert({
     *   create: {
     *     // ... data to create a RegistroTipo10
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistroTipo10 we want to update
     *   }
     * })
     */
    upsert<T extends RegistroTipo10UpsertArgs>(args: SelectSubset<T, RegistroTipo10UpsertArgs<ExtArgs>>): Prisma__RegistroTipo10Client<$Result.GetResult<Prisma.$RegistroTipo10Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegistroTipo10s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10CountArgs} args - Arguments to filter RegistroTipo10s to count.
     * @example
     * // Count the number of RegistroTipo10s
     * const count = await prisma.registroTipo10.count({
     *   where: {
     *     // ... the filter for the RegistroTipo10s we want to count
     *   }
     * })
    **/
    count<T extends RegistroTipo10CountArgs>(
      args?: Subset<T, RegistroTipo10CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistroTipo10CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegistroTipo10.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistroTipo10AggregateArgs>(args: Subset<T, RegistroTipo10AggregateArgs>): Prisma.PrismaPromise<GetRegistroTipo10AggregateType<T>>

    /**
     * Group by RegistroTipo10.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo10GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistroTipo10GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistroTipo10GroupByArgs['orderBy'] }
        : { orderBy?: RegistroTipo10GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistroTipo10GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistroTipo10GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegistroTipo10 model
   */
  readonly fields: RegistroTipo10FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegistroTipo10.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistroTipo10Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegistroTipo10 model
   */
  interface RegistroTipo10FieldRefs {
    readonly id: FieldRef<"RegistroTipo10", 'String'>
    readonly ultimo_nsr: FieldRef<"RegistroTipo10", 'Int'>
    readonly origem: FieldRef<"RegistroTipo10", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RegistroTipo10 findUnique
   */
  export type RegistroTipo10FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo10 to fetch.
     */
    where: RegistroTipo10WhereUniqueInput
  }

  /**
   * RegistroTipo10 findUniqueOrThrow
   */
  export type RegistroTipo10FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo10 to fetch.
     */
    where: RegistroTipo10WhereUniqueInput
  }

  /**
   * RegistroTipo10 findFirst
   */
  export type RegistroTipo10FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo10 to fetch.
     */
    where?: RegistroTipo10WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo10s to fetch.
     */
    orderBy?: RegistroTipo10OrderByWithRelationInput | RegistroTipo10OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroTipo10s.
     */
    cursor?: RegistroTipo10WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo10s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo10s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroTipo10s.
     */
    distinct?: RegistroTipo10ScalarFieldEnum | RegistroTipo10ScalarFieldEnum[]
  }

  /**
   * RegistroTipo10 findFirstOrThrow
   */
  export type RegistroTipo10FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo10 to fetch.
     */
    where?: RegistroTipo10WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo10s to fetch.
     */
    orderBy?: RegistroTipo10OrderByWithRelationInput | RegistroTipo10OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroTipo10s.
     */
    cursor?: RegistroTipo10WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo10s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo10s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroTipo10s.
     */
    distinct?: RegistroTipo10ScalarFieldEnum | RegistroTipo10ScalarFieldEnum[]
  }

  /**
   * RegistroTipo10 findMany
   */
  export type RegistroTipo10FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo10s to fetch.
     */
    where?: RegistroTipo10WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo10s to fetch.
     */
    orderBy?: RegistroTipo10OrderByWithRelationInput | RegistroTipo10OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegistroTipo10s.
     */
    cursor?: RegistroTipo10WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo10s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo10s.
     */
    skip?: number
    distinct?: RegistroTipo10ScalarFieldEnum | RegistroTipo10ScalarFieldEnum[]
  }

  /**
   * RegistroTipo10 create
   */
  export type RegistroTipo10CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * The data needed to create a RegistroTipo10.
     */
    data: XOR<RegistroTipo10CreateInput, RegistroTipo10UncheckedCreateInput>
  }

  /**
   * RegistroTipo10 createMany
   */
  export type RegistroTipo10CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistroTipo10s.
     */
    data: RegistroTipo10CreateManyInput | RegistroTipo10CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroTipo10 createManyAndReturn
   */
  export type RegistroTipo10CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * The data used to create many RegistroTipo10s.
     */
    data: RegistroTipo10CreateManyInput | RegistroTipo10CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroTipo10 update
   */
  export type RegistroTipo10UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * The data needed to update a RegistroTipo10.
     */
    data: XOR<RegistroTipo10UpdateInput, RegistroTipo10UncheckedUpdateInput>
    /**
     * Choose, which RegistroTipo10 to update.
     */
    where: RegistroTipo10WhereUniqueInput
  }

  /**
   * RegistroTipo10 updateMany
   */
  export type RegistroTipo10UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistroTipo10s.
     */
    data: XOR<RegistroTipo10UpdateManyMutationInput, RegistroTipo10UncheckedUpdateManyInput>
    /**
     * Filter which RegistroTipo10s to update
     */
    where?: RegistroTipo10WhereInput
    /**
     * Limit how many RegistroTipo10s to update.
     */
    limit?: number
  }

  /**
   * RegistroTipo10 updateManyAndReturn
   */
  export type RegistroTipo10UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * The data used to update RegistroTipo10s.
     */
    data: XOR<RegistroTipo10UpdateManyMutationInput, RegistroTipo10UncheckedUpdateManyInput>
    /**
     * Filter which RegistroTipo10s to update
     */
    where?: RegistroTipo10WhereInput
    /**
     * Limit how many RegistroTipo10s to update.
     */
    limit?: number
  }

  /**
   * RegistroTipo10 upsert
   */
  export type RegistroTipo10UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * The filter to search for the RegistroTipo10 to update in case it exists.
     */
    where: RegistroTipo10WhereUniqueInput
    /**
     * In case the RegistroTipo10 found by the `where` argument doesn't exist, create a new RegistroTipo10 with this data.
     */
    create: XOR<RegistroTipo10CreateInput, RegistroTipo10UncheckedCreateInput>
    /**
     * In case the RegistroTipo10 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistroTipo10UpdateInput, RegistroTipo10UncheckedUpdateInput>
  }

  /**
   * RegistroTipo10 delete
   */
  export type RegistroTipo10DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
    /**
     * Filter which RegistroTipo10 to delete.
     */
    where: RegistroTipo10WhereUniqueInput
  }

  /**
   * RegistroTipo10 deleteMany
   */
  export type RegistroTipo10DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroTipo10s to delete
     */
    where?: RegistroTipo10WhereInput
    /**
     * Limit how many RegistroTipo10s to delete.
     */
    limit?: number
  }

  /**
   * RegistroTipo10 without action
   */
  export type RegistroTipo10DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo10
     */
    select?: RegistroTipo10Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo10
     */
    omit?: RegistroTipo10Omit<ExtArgs> | null
  }


  /**
   * Model RegistroTipo3
   */

  export type AggregateRegistroTipo3 = {
    _count: RegistroTipo3CountAggregateOutputType | null
    _avg: RegistroTipo3AvgAggregateOutputType | null
    _sum: RegistroTipo3SumAggregateOutputType | null
    _min: RegistroTipo3MinAggregateOutputType | null
    _max: RegistroTipo3MaxAggregateOutputType | null
  }

  export type RegistroTipo3AvgAggregateOutputType = {
    nsr: number | null
  }

  export type RegistroTipo3SumAggregateOutputType = {
    nsr: number | null
  }

  export type RegistroTipo3MinAggregateOutputType = {
    id: string | null
    nsr: number | null
    tipo: string | null
    dataCompleta: Date | null
    data: string | null
    hora: string | null
    cpfEmpregado: string | null
    crc: string | null
    origem: string | null
  }

  export type RegistroTipo3MaxAggregateOutputType = {
    id: string | null
    nsr: number | null
    tipo: string | null
    dataCompleta: Date | null
    data: string | null
    hora: string | null
    cpfEmpregado: string | null
    crc: string | null
    origem: string | null
  }

  export type RegistroTipo3CountAggregateOutputType = {
    id: number
    nsr: number
    tipo: number
    dataCompleta: number
    data: number
    hora: number
    cpfEmpregado: number
    crc: number
    origem: number
    _all: number
  }


  export type RegistroTipo3AvgAggregateInputType = {
    nsr?: true
  }

  export type RegistroTipo3SumAggregateInputType = {
    nsr?: true
  }

  export type RegistroTipo3MinAggregateInputType = {
    id?: true
    nsr?: true
    tipo?: true
    dataCompleta?: true
    data?: true
    hora?: true
    cpfEmpregado?: true
    crc?: true
    origem?: true
  }

  export type RegistroTipo3MaxAggregateInputType = {
    id?: true
    nsr?: true
    tipo?: true
    dataCompleta?: true
    data?: true
    hora?: true
    cpfEmpregado?: true
    crc?: true
    origem?: true
  }

  export type RegistroTipo3CountAggregateInputType = {
    id?: true
    nsr?: true
    tipo?: true
    dataCompleta?: true
    data?: true
    hora?: true
    cpfEmpregado?: true
    crc?: true
    origem?: true
    _all?: true
  }

  export type RegistroTipo3AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroTipo3 to aggregate.
     */
    where?: RegistroTipo3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo3s to fetch.
     */
    orderBy?: RegistroTipo3OrderByWithRelationInput | RegistroTipo3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistroTipo3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo3s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegistroTipo3s
    **/
    _count?: true | RegistroTipo3CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistroTipo3AvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistroTipo3SumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistroTipo3MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistroTipo3MaxAggregateInputType
  }

  export type GetRegistroTipo3AggregateType<T extends RegistroTipo3AggregateArgs> = {
        [P in keyof T & keyof AggregateRegistroTipo3]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistroTipo3[P]>
      : GetScalarType<T[P], AggregateRegistroTipo3[P]>
  }




  export type RegistroTipo3GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistroTipo3WhereInput
    orderBy?: RegistroTipo3OrderByWithAggregationInput | RegistroTipo3OrderByWithAggregationInput[]
    by: RegistroTipo3ScalarFieldEnum[] | RegistroTipo3ScalarFieldEnum
    having?: RegistroTipo3ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistroTipo3CountAggregateInputType | true
    _avg?: RegistroTipo3AvgAggregateInputType
    _sum?: RegistroTipo3SumAggregateInputType
    _min?: RegistroTipo3MinAggregateInputType
    _max?: RegistroTipo3MaxAggregateInputType
  }

  export type RegistroTipo3GroupByOutputType = {
    id: string
    nsr: number
    tipo: string
    dataCompleta: Date
    data: string
    hora: string
    cpfEmpregado: string
    crc: string
    origem: string | null
    _count: RegistroTipo3CountAggregateOutputType | null
    _avg: RegistroTipo3AvgAggregateOutputType | null
    _sum: RegistroTipo3SumAggregateOutputType | null
    _min: RegistroTipo3MinAggregateOutputType | null
    _max: RegistroTipo3MaxAggregateOutputType | null
  }

  type GetRegistroTipo3GroupByPayload<T extends RegistroTipo3GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistroTipo3GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistroTipo3GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistroTipo3GroupByOutputType[P]>
            : GetScalarType<T[P], RegistroTipo3GroupByOutputType[P]>
        }
      >
    >


  export type RegistroTipo3Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nsr?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    data?: boolean
    hora?: boolean
    cpfEmpregado?: boolean
    crc?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo3"]>

  export type RegistroTipo3SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nsr?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    data?: boolean
    hora?: boolean
    cpfEmpregado?: boolean
    crc?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo3"]>

  export type RegistroTipo3SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nsr?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    data?: boolean
    hora?: boolean
    cpfEmpregado?: boolean
    crc?: boolean
    origem?: boolean
  }, ExtArgs["result"]["registroTipo3"]>

  export type RegistroTipo3SelectScalar = {
    id?: boolean
    nsr?: boolean
    tipo?: boolean
    dataCompleta?: boolean
    data?: boolean
    hora?: boolean
    cpfEmpregado?: boolean
    crc?: boolean
    origem?: boolean
  }

  export type RegistroTipo3Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nsr" | "tipo" | "dataCompleta" | "data" | "hora" | "cpfEmpregado" | "crc" | "origem", ExtArgs["result"]["registroTipo3"]>

  export type $RegistroTipo3Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegistroTipo3"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nsr: number
      tipo: string
      dataCompleta: Date
      data: string
      hora: string
      cpfEmpregado: string
      crc: string
      origem: string | null
    }, ExtArgs["result"]["registroTipo3"]>
    composites: {}
  }

  type RegistroTipo3GetPayload<S extends boolean | null | undefined | RegistroTipo3DefaultArgs> = $Result.GetResult<Prisma.$RegistroTipo3Payload, S>

  type RegistroTipo3CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistroTipo3FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistroTipo3CountAggregateInputType | true
    }

  export interface RegistroTipo3Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegistroTipo3'], meta: { name: 'RegistroTipo3' } }
    /**
     * Find zero or one RegistroTipo3 that matches the filter.
     * @param {RegistroTipo3FindUniqueArgs} args - Arguments to find a RegistroTipo3
     * @example
     * // Get one RegistroTipo3
     * const registroTipo3 = await prisma.registroTipo3.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistroTipo3FindUniqueArgs>(args: SelectSubset<T, RegistroTipo3FindUniqueArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegistroTipo3 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistroTipo3FindUniqueOrThrowArgs} args - Arguments to find a RegistroTipo3
     * @example
     * // Get one RegistroTipo3
     * const registroTipo3 = await prisma.registroTipo3.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistroTipo3FindUniqueOrThrowArgs>(args: SelectSubset<T, RegistroTipo3FindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistroTipo3 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3FindFirstArgs} args - Arguments to find a RegistroTipo3
     * @example
     * // Get one RegistroTipo3
     * const registroTipo3 = await prisma.registroTipo3.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistroTipo3FindFirstArgs>(args?: SelectSubset<T, RegistroTipo3FindFirstArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistroTipo3 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3FindFirstOrThrowArgs} args - Arguments to find a RegistroTipo3
     * @example
     * // Get one RegistroTipo3
     * const registroTipo3 = await prisma.registroTipo3.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistroTipo3FindFirstOrThrowArgs>(args?: SelectSubset<T, RegistroTipo3FindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegistroTipo3s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistroTipo3s
     * const registroTipo3s = await prisma.registroTipo3.findMany()
     * 
     * // Get first 10 RegistroTipo3s
     * const registroTipo3s = await prisma.registroTipo3.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registroTipo3WithIdOnly = await prisma.registroTipo3.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistroTipo3FindManyArgs>(args?: SelectSubset<T, RegistroTipo3FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegistroTipo3.
     * @param {RegistroTipo3CreateArgs} args - Arguments to create a RegistroTipo3.
     * @example
     * // Create one RegistroTipo3
     * const RegistroTipo3 = await prisma.registroTipo3.create({
     *   data: {
     *     // ... data to create a RegistroTipo3
     *   }
     * })
     * 
     */
    create<T extends RegistroTipo3CreateArgs>(args: SelectSubset<T, RegistroTipo3CreateArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegistroTipo3s.
     * @param {RegistroTipo3CreateManyArgs} args - Arguments to create many RegistroTipo3s.
     * @example
     * // Create many RegistroTipo3s
     * const registroTipo3 = await prisma.registroTipo3.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistroTipo3CreateManyArgs>(args?: SelectSubset<T, RegistroTipo3CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegistroTipo3s and returns the data saved in the database.
     * @param {RegistroTipo3CreateManyAndReturnArgs} args - Arguments to create many RegistroTipo3s.
     * @example
     * // Create many RegistroTipo3s
     * const registroTipo3 = await prisma.registroTipo3.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegistroTipo3s and only return the `id`
     * const registroTipo3WithIdOnly = await prisma.registroTipo3.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistroTipo3CreateManyAndReturnArgs>(args?: SelectSubset<T, RegistroTipo3CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegistroTipo3.
     * @param {RegistroTipo3DeleteArgs} args - Arguments to delete one RegistroTipo3.
     * @example
     * // Delete one RegistroTipo3
     * const RegistroTipo3 = await prisma.registroTipo3.delete({
     *   where: {
     *     // ... filter to delete one RegistroTipo3
     *   }
     * })
     * 
     */
    delete<T extends RegistroTipo3DeleteArgs>(args: SelectSubset<T, RegistroTipo3DeleteArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegistroTipo3.
     * @param {RegistroTipo3UpdateArgs} args - Arguments to update one RegistroTipo3.
     * @example
     * // Update one RegistroTipo3
     * const registroTipo3 = await prisma.registroTipo3.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistroTipo3UpdateArgs>(args: SelectSubset<T, RegistroTipo3UpdateArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegistroTipo3s.
     * @param {RegistroTipo3DeleteManyArgs} args - Arguments to filter RegistroTipo3s to delete.
     * @example
     * // Delete a few RegistroTipo3s
     * const { count } = await prisma.registroTipo3.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistroTipo3DeleteManyArgs>(args?: SelectSubset<T, RegistroTipo3DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroTipo3s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistroTipo3s
     * const registroTipo3 = await prisma.registroTipo3.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistroTipo3UpdateManyArgs>(args: SelectSubset<T, RegistroTipo3UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistroTipo3s and returns the data updated in the database.
     * @param {RegistroTipo3UpdateManyAndReturnArgs} args - Arguments to update many RegistroTipo3s.
     * @example
     * // Update many RegistroTipo3s
     * const registroTipo3 = await prisma.registroTipo3.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegistroTipo3s and only return the `id`
     * const registroTipo3WithIdOnly = await prisma.registroTipo3.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistroTipo3UpdateManyAndReturnArgs>(args: SelectSubset<T, RegistroTipo3UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegistroTipo3.
     * @param {RegistroTipo3UpsertArgs} args - Arguments to update or create a RegistroTipo3.
     * @example
     * // Update or create a RegistroTipo3
     * const registroTipo3 = await prisma.registroTipo3.upsert({
     *   create: {
     *     // ... data to create a RegistroTipo3
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistroTipo3 we want to update
     *   }
     * })
     */
    upsert<T extends RegistroTipo3UpsertArgs>(args: SelectSubset<T, RegistroTipo3UpsertArgs<ExtArgs>>): Prisma__RegistroTipo3Client<$Result.GetResult<Prisma.$RegistroTipo3Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegistroTipo3s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3CountArgs} args - Arguments to filter RegistroTipo3s to count.
     * @example
     * // Count the number of RegistroTipo3s
     * const count = await prisma.registroTipo3.count({
     *   where: {
     *     // ... the filter for the RegistroTipo3s we want to count
     *   }
     * })
    **/
    count<T extends RegistroTipo3CountArgs>(
      args?: Subset<T, RegistroTipo3CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistroTipo3CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegistroTipo3.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistroTipo3AggregateArgs>(args: Subset<T, RegistroTipo3AggregateArgs>): Prisma.PrismaPromise<GetRegistroTipo3AggregateType<T>>

    /**
     * Group by RegistroTipo3.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistroTipo3GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistroTipo3GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistroTipo3GroupByArgs['orderBy'] }
        : { orderBy?: RegistroTipo3GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistroTipo3GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistroTipo3GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegistroTipo3 model
   */
  readonly fields: RegistroTipo3FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegistroTipo3.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistroTipo3Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegistroTipo3 model
   */
  interface RegistroTipo3FieldRefs {
    readonly id: FieldRef<"RegistroTipo3", 'String'>
    readonly nsr: FieldRef<"RegistroTipo3", 'Int'>
    readonly tipo: FieldRef<"RegistroTipo3", 'String'>
    readonly dataCompleta: FieldRef<"RegistroTipo3", 'DateTime'>
    readonly data: FieldRef<"RegistroTipo3", 'String'>
    readonly hora: FieldRef<"RegistroTipo3", 'String'>
    readonly cpfEmpregado: FieldRef<"RegistroTipo3", 'String'>
    readonly crc: FieldRef<"RegistroTipo3", 'String'>
    readonly origem: FieldRef<"RegistroTipo3", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RegistroTipo3 findUnique
   */
  export type RegistroTipo3FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo3 to fetch.
     */
    where: RegistroTipo3WhereUniqueInput
  }

  /**
   * RegistroTipo3 findUniqueOrThrow
   */
  export type RegistroTipo3FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo3 to fetch.
     */
    where: RegistroTipo3WhereUniqueInput
  }

  /**
   * RegistroTipo3 findFirst
   */
  export type RegistroTipo3FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo3 to fetch.
     */
    where?: RegistroTipo3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo3s to fetch.
     */
    orderBy?: RegistroTipo3OrderByWithRelationInput | RegistroTipo3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroTipo3s.
     */
    cursor?: RegistroTipo3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo3s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroTipo3s.
     */
    distinct?: RegistroTipo3ScalarFieldEnum | RegistroTipo3ScalarFieldEnum[]
  }

  /**
   * RegistroTipo3 findFirstOrThrow
   */
  export type RegistroTipo3FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo3 to fetch.
     */
    where?: RegistroTipo3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo3s to fetch.
     */
    orderBy?: RegistroTipo3OrderByWithRelationInput | RegistroTipo3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistroTipo3s.
     */
    cursor?: RegistroTipo3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo3s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistroTipo3s.
     */
    distinct?: RegistroTipo3ScalarFieldEnum | RegistroTipo3ScalarFieldEnum[]
  }

  /**
   * RegistroTipo3 findMany
   */
  export type RegistroTipo3FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * Filter, which RegistroTipo3s to fetch.
     */
    where?: RegistroTipo3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistroTipo3s to fetch.
     */
    orderBy?: RegistroTipo3OrderByWithRelationInput | RegistroTipo3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegistroTipo3s.
     */
    cursor?: RegistroTipo3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistroTipo3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistroTipo3s.
     */
    skip?: number
    distinct?: RegistroTipo3ScalarFieldEnum | RegistroTipo3ScalarFieldEnum[]
  }

  /**
   * RegistroTipo3 create
   */
  export type RegistroTipo3CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * The data needed to create a RegistroTipo3.
     */
    data: XOR<RegistroTipo3CreateInput, RegistroTipo3UncheckedCreateInput>
  }

  /**
   * RegistroTipo3 createMany
   */
  export type RegistroTipo3CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistroTipo3s.
     */
    data: RegistroTipo3CreateManyInput | RegistroTipo3CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroTipo3 createManyAndReturn
   */
  export type RegistroTipo3CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * The data used to create many RegistroTipo3s.
     */
    data: RegistroTipo3CreateManyInput | RegistroTipo3CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistroTipo3 update
   */
  export type RegistroTipo3UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * The data needed to update a RegistroTipo3.
     */
    data: XOR<RegistroTipo3UpdateInput, RegistroTipo3UncheckedUpdateInput>
    /**
     * Choose, which RegistroTipo3 to update.
     */
    where: RegistroTipo3WhereUniqueInput
  }

  /**
   * RegistroTipo3 updateMany
   */
  export type RegistroTipo3UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistroTipo3s.
     */
    data: XOR<RegistroTipo3UpdateManyMutationInput, RegistroTipo3UncheckedUpdateManyInput>
    /**
     * Filter which RegistroTipo3s to update
     */
    where?: RegistroTipo3WhereInput
    /**
     * Limit how many RegistroTipo3s to update.
     */
    limit?: number
  }

  /**
   * RegistroTipo3 updateManyAndReturn
   */
  export type RegistroTipo3UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * The data used to update RegistroTipo3s.
     */
    data: XOR<RegistroTipo3UpdateManyMutationInput, RegistroTipo3UncheckedUpdateManyInput>
    /**
     * Filter which RegistroTipo3s to update
     */
    where?: RegistroTipo3WhereInput
    /**
     * Limit how many RegistroTipo3s to update.
     */
    limit?: number
  }

  /**
   * RegistroTipo3 upsert
   */
  export type RegistroTipo3UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * The filter to search for the RegistroTipo3 to update in case it exists.
     */
    where: RegistroTipo3WhereUniqueInput
    /**
     * In case the RegistroTipo3 found by the `where` argument doesn't exist, create a new RegistroTipo3 with this data.
     */
    create: XOR<RegistroTipo3CreateInput, RegistroTipo3UncheckedCreateInput>
    /**
     * In case the RegistroTipo3 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistroTipo3UpdateInput, RegistroTipo3UncheckedUpdateInput>
  }

  /**
   * RegistroTipo3 delete
   */
  export type RegistroTipo3DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
    /**
     * Filter which RegistroTipo3 to delete.
     */
    where: RegistroTipo3WhereUniqueInput
  }

  /**
   * RegistroTipo3 deleteMany
   */
  export type RegistroTipo3DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistroTipo3s to delete
     */
    where?: RegistroTipo3WhereInput
    /**
     * Limit how many RegistroTipo3s to delete.
     */
    limit?: number
  }

  /**
   * RegistroTipo3 without action
   */
  export type RegistroTipo3DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistroTipo3
     */
    select?: RegistroTipo3Select<ExtArgs> | null
    /**
     * Omit specific fields from the RegistroTipo3
     */
    omit?: RegistroTipo3Omit<ExtArgs> | null
  }


  /**
   * Model EspelhoDiario
   */

  export type AggregateEspelhoDiario = {
    _count: EspelhoDiarioCountAggregateOutputType | null
    _avg: EspelhoDiarioAvgAggregateOutputType | null
    _sum: EspelhoDiarioSumAggregateOutputType | null
    _min: EspelhoDiarioMinAggregateOutputType | null
    _max: EspelhoDiarioMaxAggregateOutputType | null
  }

  export type EspelhoDiarioAvgAggregateOutputType = {
    id: number | null
    credito: number | null
    debito: number | null
    horasNormais: number | null
    horasExtras: number | null
    saldo: number | null
    horasTrabalhadas: number | null
  }

  export type EspelhoDiarioSumAggregateOutputType = {
    id: number | null
    credito: number | null
    debito: number | null
    horasNormais: number | null
    horasExtras: number | null
    saldo: number | null
    horasTrabalhadas: number | null
  }

  export type EspelhoDiarioMinAggregateOutputType = {
    id: number | null
    cpf: string | null
    mesAno: string | null
    diaDoMes: string | null
    credito: number | null
    debito: number | null
    horasNormais: number | null
    horasExtras: number | null
    saldo: number | null
    motivoReajuste: string | null
    data: string | null
    primeiraEntrada: string | null
    primeiraSaida: string | null
    segundaEntrada: string | null
    segundaSaida: string | null
    horasTrabalhadas: number | null
    observacoes: string | null
    status: string | null
    origem: string | null
  }

  export type EspelhoDiarioMaxAggregateOutputType = {
    id: number | null
    cpf: string | null
    mesAno: string | null
    diaDoMes: string | null
    credito: number | null
    debito: number | null
    horasNormais: number | null
    horasExtras: number | null
    saldo: number | null
    motivoReajuste: string | null
    data: string | null
    primeiraEntrada: string | null
    primeiraSaida: string | null
    segundaEntrada: string | null
    segundaSaida: string | null
    horasTrabalhadas: number | null
    observacoes: string | null
    status: string | null
    origem: string | null
  }

  export type EspelhoDiarioCountAggregateOutputType = {
    id: number
    cpf: number
    mesAno: number
    diaDoMes: number
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste: number
    data: number
    primeiraEntrada: number
    primeiraSaida: number
    segundaEntrada: number
    segundaSaida: number
    horasTrabalhadas: number
    observacoes: number
    status: number
    origem: number
    _all: number
  }


  export type EspelhoDiarioAvgAggregateInputType = {
    id?: true
    credito?: true
    debito?: true
    horasNormais?: true
    horasExtras?: true
    saldo?: true
    horasTrabalhadas?: true
  }

  export type EspelhoDiarioSumAggregateInputType = {
    id?: true
    credito?: true
    debito?: true
    horasNormais?: true
    horasExtras?: true
    saldo?: true
    horasTrabalhadas?: true
  }

  export type EspelhoDiarioMinAggregateInputType = {
    id?: true
    cpf?: true
    mesAno?: true
    diaDoMes?: true
    credito?: true
    debito?: true
    horasNormais?: true
    horasExtras?: true
    saldo?: true
    motivoReajuste?: true
    data?: true
    primeiraEntrada?: true
    primeiraSaida?: true
    segundaEntrada?: true
    segundaSaida?: true
    horasTrabalhadas?: true
    observacoes?: true
    status?: true
    origem?: true
  }

  export type EspelhoDiarioMaxAggregateInputType = {
    id?: true
    cpf?: true
    mesAno?: true
    diaDoMes?: true
    credito?: true
    debito?: true
    horasNormais?: true
    horasExtras?: true
    saldo?: true
    motivoReajuste?: true
    data?: true
    primeiraEntrada?: true
    primeiraSaida?: true
    segundaEntrada?: true
    segundaSaida?: true
    horasTrabalhadas?: true
    observacoes?: true
    status?: true
    origem?: true
  }

  export type EspelhoDiarioCountAggregateInputType = {
    id?: true
    cpf?: true
    mesAno?: true
    diaDoMes?: true
    credito?: true
    debito?: true
    horasNormais?: true
    horasExtras?: true
    saldo?: true
    motivoReajuste?: true
    data?: true
    primeiraEntrada?: true
    primeiraSaida?: true
    segundaEntrada?: true
    segundaSaida?: true
    horasTrabalhadas?: true
    observacoes?: true
    status?: true
    origem?: true
    _all?: true
  }

  export type EspelhoDiarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EspelhoDiario to aggregate.
     */
    where?: EspelhoDiarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoDiarios to fetch.
     */
    orderBy?: EspelhoDiarioOrderByWithRelationInput | EspelhoDiarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EspelhoDiarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoDiarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoDiarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EspelhoDiarios
    **/
    _count?: true | EspelhoDiarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EspelhoDiarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EspelhoDiarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EspelhoDiarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EspelhoDiarioMaxAggregateInputType
  }

  export type GetEspelhoDiarioAggregateType<T extends EspelhoDiarioAggregateArgs> = {
        [P in keyof T & keyof AggregateEspelhoDiario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEspelhoDiario[P]>
      : GetScalarType<T[P], AggregateEspelhoDiario[P]>
  }




  export type EspelhoDiarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EspelhoDiarioWhereInput
    orderBy?: EspelhoDiarioOrderByWithAggregationInput | EspelhoDiarioOrderByWithAggregationInput[]
    by: EspelhoDiarioScalarFieldEnum[] | EspelhoDiarioScalarFieldEnum
    having?: EspelhoDiarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EspelhoDiarioCountAggregateInputType | true
    _avg?: EspelhoDiarioAvgAggregateInputType
    _sum?: EspelhoDiarioSumAggregateInputType
    _min?: EspelhoDiarioMinAggregateInputType
    _max?: EspelhoDiarioMaxAggregateInputType
  }

  export type EspelhoDiarioGroupByOutputType = {
    id: number
    cpf: string
    mesAno: string
    diaDoMes: string
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste: string | null
    data: string
    primeiraEntrada: string | null
    primeiraSaida: string | null
    segundaEntrada: string | null
    segundaSaida: string | null
    horasTrabalhadas: number
    observacoes: string
    status: string
    origem: string | null
    _count: EspelhoDiarioCountAggregateOutputType | null
    _avg: EspelhoDiarioAvgAggregateOutputType | null
    _sum: EspelhoDiarioSumAggregateOutputType | null
    _min: EspelhoDiarioMinAggregateOutputType | null
    _max: EspelhoDiarioMaxAggregateOutputType | null
  }

  type GetEspelhoDiarioGroupByPayload<T extends EspelhoDiarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EspelhoDiarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EspelhoDiarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EspelhoDiarioGroupByOutputType[P]>
            : GetScalarType<T[P], EspelhoDiarioGroupByOutputType[P]>
        }
      >
    >


  export type EspelhoDiarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diaDoMes?: boolean
    credito?: boolean
    debito?: boolean
    horasNormais?: boolean
    horasExtras?: boolean
    saldo?: boolean
    motivoReajuste?: boolean
    data?: boolean
    primeiraEntrada?: boolean
    primeiraSaida?: boolean
    segundaEntrada?: boolean
    segundaSaida?: boolean
    horasTrabalhadas?: boolean
    observacoes?: boolean
    status?: boolean
    origem?: boolean
    EspelhoMensal?: boolean | EspelhoDiario$EspelhoMensalArgs<ExtArgs>
    _count?: boolean | EspelhoDiarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["espelhoDiario"]>

  export type EspelhoDiarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diaDoMes?: boolean
    credito?: boolean
    debito?: boolean
    horasNormais?: boolean
    horasExtras?: boolean
    saldo?: boolean
    motivoReajuste?: boolean
    data?: boolean
    primeiraEntrada?: boolean
    primeiraSaida?: boolean
    segundaEntrada?: boolean
    segundaSaida?: boolean
    horasTrabalhadas?: boolean
    observacoes?: boolean
    status?: boolean
    origem?: boolean
  }, ExtArgs["result"]["espelhoDiario"]>

  export type EspelhoDiarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diaDoMes?: boolean
    credito?: boolean
    debito?: boolean
    horasNormais?: boolean
    horasExtras?: boolean
    saldo?: boolean
    motivoReajuste?: boolean
    data?: boolean
    primeiraEntrada?: boolean
    primeiraSaida?: boolean
    segundaEntrada?: boolean
    segundaSaida?: boolean
    horasTrabalhadas?: boolean
    observacoes?: boolean
    status?: boolean
    origem?: boolean
  }, ExtArgs["result"]["espelhoDiario"]>

  export type EspelhoDiarioSelectScalar = {
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diaDoMes?: boolean
    credito?: boolean
    debito?: boolean
    horasNormais?: boolean
    horasExtras?: boolean
    saldo?: boolean
    motivoReajuste?: boolean
    data?: boolean
    primeiraEntrada?: boolean
    primeiraSaida?: boolean
    segundaEntrada?: boolean
    segundaSaida?: boolean
    horasTrabalhadas?: boolean
    observacoes?: boolean
    status?: boolean
    origem?: boolean
  }

  export type EspelhoDiarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cpf" | "mesAno" | "diaDoMes" | "credito" | "debito" | "horasNormais" | "horasExtras" | "saldo" | "motivoReajuste" | "data" | "primeiraEntrada" | "primeiraSaida" | "segundaEntrada" | "segundaSaida" | "horasTrabalhadas" | "observacoes" | "status" | "origem", ExtArgs["result"]["espelhoDiario"]>
  export type EspelhoDiarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    EspelhoMensal?: boolean | EspelhoDiario$EspelhoMensalArgs<ExtArgs>
    _count?: boolean | EspelhoDiarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EspelhoDiarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EspelhoDiarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EspelhoDiarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EspelhoDiario"
    objects: {
      EspelhoMensal: Prisma.$EspelhoMensalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cpf: string
      mesAno: string
      diaDoMes: string
      credito: number
      debito: number
      horasNormais: number
      horasExtras: number
      saldo: number
      motivoReajuste: string | null
      data: string
      primeiraEntrada: string | null
      primeiraSaida: string | null
      segundaEntrada: string | null
      segundaSaida: string | null
      horasTrabalhadas: number
      observacoes: string
      status: string
      origem: string | null
    }, ExtArgs["result"]["espelhoDiario"]>
    composites: {}
  }

  type EspelhoDiarioGetPayload<S extends boolean | null | undefined | EspelhoDiarioDefaultArgs> = $Result.GetResult<Prisma.$EspelhoDiarioPayload, S>

  type EspelhoDiarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EspelhoDiarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EspelhoDiarioCountAggregateInputType | true
    }

  export interface EspelhoDiarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EspelhoDiario'], meta: { name: 'EspelhoDiario' } }
    /**
     * Find zero or one EspelhoDiario that matches the filter.
     * @param {EspelhoDiarioFindUniqueArgs} args - Arguments to find a EspelhoDiario
     * @example
     * // Get one EspelhoDiario
     * const espelhoDiario = await prisma.espelhoDiario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EspelhoDiarioFindUniqueArgs>(args: SelectSubset<T, EspelhoDiarioFindUniqueArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EspelhoDiario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EspelhoDiarioFindUniqueOrThrowArgs} args - Arguments to find a EspelhoDiario
     * @example
     * // Get one EspelhoDiario
     * const espelhoDiario = await prisma.espelhoDiario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EspelhoDiarioFindUniqueOrThrowArgs>(args: SelectSubset<T, EspelhoDiarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EspelhoDiario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioFindFirstArgs} args - Arguments to find a EspelhoDiario
     * @example
     * // Get one EspelhoDiario
     * const espelhoDiario = await prisma.espelhoDiario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EspelhoDiarioFindFirstArgs>(args?: SelectSubset<T, EspelhoDiarioFindFirstArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EspelhoDiario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioFindFirstOrThrowArgs} args - Arguments to find a EspelhoDiario
     * @example
     * // Get one EspelhoDiario
     * const espelhoDiario = await prisma.espelhoDiario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EspelhoDiarioFindFirstOrThrowArgs>(args?: SelectSubset<T, EspelhoDiarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EspelhoDiarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EspelhoDiarios
     * const espelhoDiarios = await prisma.espelhoDiario.findMany()
     * 
     * // Get first 10 EspelhoDiarios
     * const espelhoDiarios = await prisma.espelhoDiario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const espelhoDiarioWithIdOnly = await prisma.espelhoDiario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EspelhoDiarioFindManyArgs>(args?: SelectSubset<T, EspelhoDiarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EspelhoDiario.
     * @param {EspelhoDiarioCreateArgs} args - Arguments to create a EspelhoDiario.
     * @example
     * // Create one EspelhoDiario
     * const EspelhoDiario = await prisma.espelhoDiario.create({
     *   data: {
     *     // ... data to create a EspelhoDiario
     *   }
     * })
     * 
     */
    create<T extends EspelhoDiarioCreateArgs>(args: SelectSubset<T, EspelhoDiarioCreateArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EspelhoDiarios.
     * @param {EspelhoDiarioCreateManyArgs} args - Arguments to create many EspelhoDiarios.
     * @example
     * // Create many EspelhoDiarios
     * const espelhoDiario = await prisma.espelhoDiario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EspelhoDiarioCreateManyArgs>(args?: SelectSubset<T, EspelhoDiarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EspelhoDiarios and returns the data saved in the database.
     * @param {EspelhoDiarioCreateManyAndReturnArgs} args - Arguments to create many EspelhoDiarios.
     * @example
     * // Create many EspelhoDiarios
     * const espelhoDiario = await prisma.espelhoDiario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EspelhoDiarios and only return the `id`
     * const espelhoDiarioWithIdOnly = await prisma.espelhoDiario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EspelhoDiarioCreateManyAndReturnArgs>(args?: SelectSubset<T, EspelhoDiarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EspelhoDiario.
     * @param {EspelhoDiarioDeleteArgs} args - Arguments to delete one EspelhoDiario.
     * @example
     * // Delete one EspelhoDiario
     * const EspelhoDiario = await prisma.espelhoDiario.delete({
     *   where: {
     *     // ... filter to delete one EspelhoDiario
     *   }
     * })
     * 
     */
    delete<T extends EspelhoDiarioDeleteArgs>(args: SelectSubset<T, EspelhoDiarioDeleteArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EspelhoDiario.
     * @param {EspelhoDiarioUpdateArgs} args - Arguments to update one EspelhoDiario.
     * @example
     * // Update one EspelhoDiario
     * const espelhoDiario = await prisma.espelhoDiario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EspelhoDiarioUpdateArgs>(args: SelectSubset<T, EspelhoDiarioUpdateArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EspelhoDiarios.
     * @param {EspelhoDiarioDeleteManyArgs} args - Arguments to filter EspelhoDiarios to delete.
     * @example
     * // Delete a few EspelhoDiarios
     * const { count } = await prisma.espelhoDiario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EspelhoDiarioDeleteManyArgs>(args?: SelectSubset<T, EspelhoDiarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EspelhoDiarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EspelhoDiarios
     * const espelhoDiario = await prisma.espelhoDiario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EspelhoDiarioUpdateManyArgs>(args: SelectSubset<T, EspelhoDiarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EspelhoDiarios and returns the data updated in the database.
     * @param {EspelhoDiarioUpdateManyAndReturnArgs} args - Arguments to update many EspelhoDiarios.
     * @example
     * // Update many EspelhoDiarios
     * const espelhoDiario = await prisma.espelhoDiario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EspelhoDiarios and only return the `id`
     * const espelhoDiarioWithIdOnly = await prisma.espelhoDiario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EspelhoDiarioUpdateManyAndReturnArgs>(args: SelectSubset<T, EspelhoDiarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EspelhoDiario.
     * @param {EspelhoDiarioUpsertArgs} args - Arguments to update or create a EspelhoDiario.
     * @example
     * // Update or create a EspelhoDiario
     * const espelhoDiario = await prisma.espelhoDiario.upsert({
     *   create: {
     *     // ... data to create a EspelhoDiario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EspelhoDiario we want to update
     *   }
     * })
     */
    upsert<T extends EspelhoDiarioUpsertArgs>(args: SelectSubset<T, EspelhoDiarioUpsertArgs<ExtArgs>>): Prisma__EspelhoDiarioClient<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EspelhoDiarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioCountArgs} args - Arguments to filter EspelhoDiarios to count.
     * @example
     * // Count the number of EspelhoDiarios
     * const count = await prisma.espelhoDiario.count({
     *   where: {
     *     // ... the filter for the EspelhoDiarios we want to count
     *   }
     * })
    **/
    count<T extends EspelhoDiarioCountArgs>(
      args?: Subset<T, EspelhoDiarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EspelhoDiarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EspelhoDiario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EspelhoDiarioAggregateArgs>(args: Subset<T, EspelhoDiarioAggregateArgs>): Prisma.PrismaPromise<GetEspelhoDiarioAggregateType<T>>

    /**
     * Group by EspelhoDiario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoDiarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EspelhoDiarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EspelhoDiarioGroupByArgs['orderBy'] }
        : { orderBy?: EspelhoDiarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EspelhoDiarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEspelhoDiarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EspelhoDiario model
   */
  readonly fields: EspelhoDiarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EspelhoDiario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EspelhoDiarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    EspelhoMensal<T extends EspelhoDiario$EspelhoMensalArgs<ExtArgs> = {}>(args?: Subset<T, EspelhoDiario$EspelhoMensalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EspelhoDiario model
   */
  interface EspelhoDiarioFieldRefs {
    readonly id: FieldRef<"EspelhoDiario", 'Int'>
    readonly cpf: FieldRef<"EspelhoDiario", 'String'>
    readonly mesAno: FieldRef<"EspelhoDiario", 'String'>
    readonly diaDoMes: FieldRef<"EspelhoDiario", 'String'>
    readonly credito: FieldRef<"EspelhoDiario", 'Float'>
    readonly debito: FieldRef<"EspelhoDiario", 'Float'>
    readonly horasNormais: FieldRef<"EspelhoDiario", 'Float'>
    readonly horasExtras: FieldRef<"EspelhoDiario", 'Float'>
    readonly saldo: FieldRef<"EspelhoDiario", 'Float'>
    readonly motivoReajuste: FieldRef<"EspelhoDiario", 'String'>
    readonly data: FieldRef<"EspelhoDiario", 'String'>
    readonly primeiraEntrada: FieldRef<"EspelhoDiario", 'String'>
    readonly primeiraSaida: FieldRef<"EspelhoDiario", 'String'>
    readonly segundaEntrada: FieldRef<"EspelhoDiario", 'String'>
    readonly segundaSaida: FieldRef<"EspelhoDiario", 'String'>
    readonly horasTrabalhadas: FieldRef<"EspelhoDiario", 'Float'>
    readonly observacoes: FieldRef<"EspelhoDiario", 'String'>
    readonly status: FieldRef<"EspelhoDiario", 'String'>
    readonly origem: FieldRef<"EspelhoDiario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EspelhoDiario findUnique
   */
  export type EspelhoDiarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoDiario to fetch.
     */
    where: EspelhoDiarioWhereUniqueInput
  }

  /**
   * EspelhoDiario findUniqueOrThrow
   */
  export type EspelhoDiarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoDiario to fetch.
     */
    where: EspelhoDiarioWhereUniqueInput
  }

  /**
   * EspelhoDiario findFirst
   */
  export type EspelhoDiarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoDiario to fetch.
     */
    where?: EspelhoDiarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoDiarios to fetch.
     */
    orderBy?: EspelhoDiarioOrderByWithRelationInput | EspelhoDiarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EspelhoDiarios.
     */
    cursor?: EspelhoDiarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoDiarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoDiarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EspelhoDiarios.
     */
    distinct?: EspelhoDiarioScalarFieldEnum | EspelhoDiarioScalarFieldEnum[]
  }

  /**
   * EspelhoDiario findFirstOrThrow
   */
  export type EspelhoDiarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoDiario to fetch.
     */
    where?: EspelhoDiarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoDiarios to fetch.
     */
    orderBy?: EspelhoDiarioOrderByWithRelationInput | EspelhoDiarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EspelhoDiarios.
     */
    cursor?: EspelhoDiarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoDiarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoDiarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EspelhoDiarios.
     */
    distinct?: EspelhoDiarioScalarFieldEnum | EspelhoDiarioScalarFieldEnum[]
  }

  /**
   * EspelhoDiario findMany
   */
  export type EspelhoDiarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoDiarios to fetch.
     */
    where?: EspelhoDiarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoDiarios to fetch.
     */
    orderBy?: EspelhoDiarioOrderByWithRelationInput | EspelhoDiarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EspelhoDiarios.
     */
    cursor?: EspelhoDiarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoDiarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoDiarios.
     */
    skip?: number
    distinct?: EspelhoDiarioScalarFieldEnum | EspelhoDiarioScalarFieldEnum[]
  }

  /**
   * EspelhoDiario create
   */
  export type EspelhoDiarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * The data needed to create a EspelhoDiario.
     */
    data: XOR<EspelhoDiarioCreateInput, EspelhoDiarioUncheckedCreateInput>
  }

  /**
   * EspelhoDiario createMany
   */
  export type EspelhoDiarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EspelhoDiarios.
     */
    data: EspelhoDiarioCreateManyInput | EspelhoDiarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EspelhoDiario createManyAndReturn
   */
  export type EspelhoDiarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * The data used to create many EspelhoDiarios.
     */
    data: EspelhoDiarioCreateManyInput | EspelhoDiarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EspelhoDiario update
   */
  export type EspelhoDiarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * The data needed to update a EspelhoDiario.
     */
    data: XOR<EspelhoDiarioUpdateInput, EspelhoDiarioUncheckedUpdateInput>
    /**
     * Choose, which EspelhoDiario to update.
     */
    where: EspelhoDiarioWhereUniqueInput
  }

  /**
   * EspelhoDiario updateMany
   */
  export type EspelhoDiarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EspelhoDiarios.
     */
    data: XOR<EspelhoDiarioUpdateManyMutationInput, EspelhoDiarioUncheckedUpdateManyInput>
    /**
     * Filter which EspelhoDiarios to update
     */
    where?: EspelhoDiarioWhereInput
    /**
     * Limit how many EspelhoDiarios to update.
     */
    limit?: number
  }

  /**
   * EspelhoDiario updateManyAndReturn
   */
  export type EspelhoDiarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * The data used to update EspelhoDiarios.
     */
    data: XOR<EspelhoDiarioUpdateManyMutationInput, EspelhoDiarioUncheckedUpdateManyInput>
    /**
     * Filter which EspelhoDiarios to update
     */
    where?: EspelhoDiarioWhereInput
    /**
     * Limit how many EspelhoDiarios to update.
     */
    limit?: number
  }

  /**
   * EspelhoDiario upsert
   */
  export type EspelhoDiarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * The filter to search for the EspelhoDiario to update in case it exists.
     */
    where: EspelhoDiarioWhereUniqueInput
    /**
     * In case the EspelhoDiario found by the `where` argument doesn't exist, create a new EspelhoDiario with this data.
     */
    create: XOR<EspelhoDiarioCreateInput, EspelhoDiarioUncheckedCreateInput>
    /**
     * In case the EspelhoDiario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EspelhoDiarioUpdateInput, EspelhoDiarioUncheckedUpdateInput>
  }

  /**
   * EspelhoDiario delete
   */
  export type EspelhoDiarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    /**
     * Filter which EspelhoDiario to delete.
     */
    where: EspelhoDiarioWhereUniqueInput
  }

  /**
   * EspelhoDiario deleteMany
   */
  export type EspelhoDiarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EspelhoDiarios to delete
     */
    where?: EspelhoDiarioWhereInput
    /**
     * Limit how many EspelhoDiarios to delete.
     */
    limit?: number
  }

  /**
   * EspelhoDiario.EspelhoMensal
   */
  export type EspelhoDiario$EspelhoMensalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    where?: EspelhoMensalWhereInput
    orderBy?: EspelhoMensalOrderByWithRelationInput | EspelhoMensalOrderByWithRelationInput[]
    cursor?: EspelhoMensalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EspelhoMensalScalarFieldEnum | EspelhoMensalScalarFieldEnum[]
  }

  /**
   * EspelhoDiario without action
   */
  export type EspelhoDiarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
  }


  /**
   * Model EspelhoMensal
   */

  export type AggregateEspelhoMensal = {
    _count: EspelhoMensalCountAggregateOutputType | null
    _avg: EspelhoMensalAvgAggregateOutputType | null
    _sum: EspelhoMensalSumAggregateOutputType | null
    _min: EspelhoMensalMinAggregateOutputType | null
    _max: EspelhoMensalMaxAggregateOutputType | null
  }

  export type EspelhoMensalAvgAggregateOutputType = {
    id: number | null
    diasUteis: number | null
    diasTrabalhados: number | null
    registrosCorretos: number | null
    ajustesEAbonos: number | null
    faltas: number | null
    totalHorasTrabalhadas: number | null
    totalHorasDevidas: number | null
    saldoHoras: number | null
  }

  export type EspelhoMensalSumAggregateOutputType = {
    id: number | null
    diasUteis: number | null
    diasTrabalhados: number | null
    registrosCorretos: number | null
    ajustesEAbonos: number | null
    faltas: number | null
    totalHorasTrabalhadas: number | null
    totalHorasDevidas: number | null
    saldoHoras: number | null
  }

  export type EspelhoMensalMinAggregateOutputType = {
    id: number | null
    cpf: string | null
    mesAno: string | null
    diasUteis: number | null
    diasTrabalhados: number | null
    registrosCorretos: number | null
    ajustesEAbonos: number | null
    faltas: number | null
    totalHorasTrabalhadas: number | null
    totalHorasDevidas: number | null
    saldoHoras: number | null
    dataCriacao: Date | null
  }

  export type EspelhoMensalMaxAggregateOutputType = {
    id: number | null
    cpf: string | null
    mesAno: string | null
    diasUteis: number | null
    diasTrabalhados: number | null
    registrosCorretos: number | null
    ajustesEAbonos: number | null
    faltas: number | null
    totalHorasTrabalhadas: number | null
    totalHorasDevidas: number | null
    saldoHoras: number | null
    dataCriacao: Date | null
  }

  export type EspelhoMensalCountAggregateOutputType = {
    id: number
    cpf: number
    mesAno: number
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos: number
    ajustesEAbonos: number
    faltas: number
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao: number
    _all: number
  }


  export type EspelhoMensalAvgAggregateInputType = {
    id?: true
    diasUteis?: true
    diasTrabalhados?: true
    registrosCorretos?: true
    ajustesEAbonos?: true
    faltas?: true
    totalHorasTrabalhadas?: true
    totalHorasDevidas?: true
    saldoHoras?: true
  }

  export type EspelhoMensalSumAggregateInputType = {
    id?: true
    diasUteis?: true
    diasTrabalhados?: true
    registrosCorretos?: true
    ajustesEAbonos?: true
    faltas?: true
    totalHorasTrabalhadas?: true
    totalHorasDevidas?: true
    saldoHoras?: true
  }

  export type EspelhoMensalMinAggregateInputType = {
    id?: true
    cpf?: true
    mesAno?: true
    diasUteis?: true
    diasTrabalhados?: true
    registrosCorretos?: true
    ajustesEAbonos?: true
    faltas?: true
    totalHorasTrabalhadas?: true
    totalHorasDevidas?: true
    saldoHoras?: true
    dataCriacao?: true
  }

  export type EspelhoMensalMaxAggregateInputType = {
    id?: true
    cpf?: true
    mesAno?: true
    diasUteis?: true
    diasTrabalhados?: true
    registrosCorretos?: true
    ajustesEAbonos?: true
    faltas?: true
    totalHorasTrabalhadas?: true
    totalHorasDevidas?: true
    saldoHoras?: true
    dataCriacao?: true
  }

  export type EspelhoMensalCountAggregateInputType = {
    id?: true
    cpf?: true
    mesAno?: true
    diasUteis?: true
    diasTrabalhados?: true
    registrosCorretos?: true
    ajustesEAbonos?: true
    faltas?: true
    totalHorasTrabalhadas?: true
    totalHorasDevidas?: true
    saldoHoras?: true
    dataCriacao?: true
    _all?: true
  }

  export type EspelhoMensalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EspelhoMensal to aggregate.
     */
    where?: EspelhoMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoMensals to fetch.
     */
    orderBy?: EspelhoMensalOrderByWithRelationInput | EspelhoMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EspelhoMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoMensals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EspelhoMensals
    **/
    _count?: true | EspelhoMensalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EspelhoMensalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EspelhoMensalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EspelhoMensalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EspelhoMensalMaxAggregateInputType
  }

  export type GetEspelhoMensalAggregateType<T extends EspelhoMensalAggregateArgs> = {
        [P in keyof T & keyof AggregateEspelhoMensal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEspelhoMensal[P]>
      : GetScalarType<T[P], AggregateEspelhoMensal[P]>
  }




  export type EspelhoMensalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EspelhoMensalWhereInput
    orderBy?: EspelhoMensalOrderByWithAggregationInput | EspelhoMensalOrderByWithAggregationInput[]
    by: EspelhoMensalScalarFieldEnum[] | EspelhoMensalScalarFieldEnum
    having?: EspelhoMensalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EspelhoMensalCountAggregateInputType | true
    _avg?: EspelhoMensalAvgAggregateInputType
    _sum?: EspelhoMensalSumAggregateInputType
    _min?: EspelhoMensalMinAggregateInputType
    _max?: EspelhoMensalMaxAggregateInputType
  }

  export type EspelhoMensalGroupByOutputType = {
    id: number
    cpf: string
    mesAno: string
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos: number | null
    ajustesEAbonos: number | null
    faltas: number | null
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao: Date
    _count: EspelhoMensalCountAggregateOutputType | null
    _avg: EspelhoMensalAvgAggregateOutputType | null
    _sum: EspelhoMensalSumAggregateOutputType | null
    _min: EspelhoMensalMinAggregateOutputType | null
    _max: EspelhoMensalMaxAggregateOutputType | null
  }

  type GetEspelhoMensalGroupByPayload<T extends EspelhoMensalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EspelhoMensalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EspelhoMensalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EspelhoMensalGroupByOutputType[P]>
            : GetScalarType<T[P], EspelhoMensalGroupByOutputType[P]>
        }
      >
    >


  export type EspelhoMensalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diasUteis?: boolean
    diasTrabalhados?: boolean
    registrosCorretos?: boolean
    ajustesEAbonos?: boolean
    faltas?: boolean
    totalHorasTrabalhadas?: boolean
    totalHorasDevidas?: boolean
    saldoHoras?: boolean
    dataCriacao?: boolean
    registros?: boolean | EspelhoMensal$registrosArgs<ExtArgs>
    _count?: boolean | EspelhoMensalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["espelhoMensal"]>

  export type EspelhoMensalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diasUteis?: boolean
    diasTrabalhados?: boolean
    registrosCorretos?: boolean
    ajustesEAbonos?: boolean
    faltas?: boolean
    totalHorasTrabalhadas?: boolean
    totalHorasDevidas?: boolean
    saldoHoras?: boolean
    dataCriacao?: boolean
  }, ExtArgs["result"]["espelhoMensal"]>

  export type EspelhoMensalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diasUteis?: boolean
    diasTrabalhados?: boolean
    registrosCorretos?: boolean
    ajustesEAbonos?: boolean
    faltas?: boolean
    totalHorasTrabalhadas?: boolean
    totalHorasDevidas?: boolean
    saldoHoras?: boolean
    dataCriacao?: boolean
  }, ExtArgs["result"]["espelhoMensal"]>

  export type EspelhoMensalSelectScalar = {
    id?: boolean
    cpf?: boolean
    mesAno?: boolean
    diasUteis?: boolean
    diasTrabalhados?: boolean
    registrosCorretos?: boolean
    ajustesEAbonos?: boolean
    faltas?: boolean
    totalHorasTrabalhadas?: boolean
    totalHorasDevidas?: boolean
    saldoHoras?: boolean
    dataCriacao?: boolean
  }

  export type EspelhoMensalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cpf" | "mesAno" | "diasUteis" | "diasTrabalhados" | "registrosCorretos" | "ajustesEAbonos" | "faltas" | "totalHorasTrabalhadas" | "totalHorasDevidas" | "saldoHoras" | "dataCriacao", ExtArgs["result"]["espelhoMensal"]>
  export type EspelhoMensalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registros?: boolean | EspelhoMensal$registrosArgs<ExtArgs>
    _count?: boolean | EspelhoMensalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EspelhoMensalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EspelhoMensalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EspelhoMensalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EspelhoMensal"
    objects: {
      registros: Prisma.$EspelhoDiarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cpf: string
      mesAno: string
      diasUteis: number
      diasTrabalhados: number
      registrosCorretos: number | null
      ajustesEAbonos: number | null
      faltas: number | null
      totalHorasTrabalhadas: number
      totalHorasDevidas: number
      saldoHoras: number
      dataCriacao: Date
    }, ExtArgs["result"]["espelhoMensal"]>
    composites: {}
  }

  type EspelhoMensalGetPayload<S extends boolean | null | undefined | EspelhoMensalDefaultArgs> = $Result.GetResult<Prisma.$EspelhoMensalPayload, S>

  type EspelhoMensalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EspelhoMensalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EspelhoMensalCountAggregateInputType | true
    }

  export interface EspelhoMensalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EspelhoMensal'], meta: { name: 'EspelhoMensal' } }
    /**
     * Find zero or one EspelhoMensal that matches the filter.
     * @param {EspelhoMensalFindUniqueArgs} args - Arguments to find a EspelhoMensal
     * @example
     * // Get one EspelhoMensal
     * const espelhoMensal = await prisma.espelhoMensal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EspelhoMensalFindUniqueArgs>(args: SelectSubset<T, EspelhoMensalFindUniqueArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EspelhoMensal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EspelhoMensalFindUniqueOrThrowArgs} args - Arguments to find a EspelhoMensal
     * @example
     * // Get one EspelhoMensal
     * const espelhoMensal = await prisma.espelhoMensal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EspelhoMensalFindUniqueOrThrowArgs>(args: SelectSubset<T, EspelhoMensalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EspelhoMensal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalFindFirstArgs} args - Arguments to find a EspelhoMensal
     * @example
     * // Get one EspelhoMensal
     * const espelhoMensal = await prisma.espelhoMensal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EspelhoMensalFindFirstArgs>(args?: SelectSubset<T, EspelhoMensalFindFirstArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EspelhoMensal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalFindFirstOrThrowArgs} args - Arguments to find a EspelhoMensal
     * @example
     * // Get one EspelhoMensal
     * const espelhoMensal = await prisma.espelhoMensal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EspelhoMensalFindFirstOrThrowArgs>(args?: SelectSubset<T, EspelhoMensalFindFirstOrThrowArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EspelhoMensals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EspelhoMensals
     * const espelhoMensals = await prisma.espelhoMensal.findMany()
     * 
     * // Get first 10 EspelhoMensals
     * const espelhoMensals = await prisma.espelhoMensal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const espelhoMensalWithIdOnly = await prisma.espelhoMensal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EspelhoMensalFindManyArgs>(args?: SelectSubset<T, EspelhoMensalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EspelhoMensal.
     * @param {EspelhoMensalCreateArgs} args - Arguments to create a EspelhoMensal.
     * @example
     * // Create one EspelhoMensal
     * const EspelhoMensal = await prisma.espelhoMensal.create({
     *   data: {
     *     // ... data to create a EspelhoMensal
     *   }
     * })
     * 
     */
    create<T extends EspelhoMensalCreateArgs>(args: SelectSubset<T, EspelhoMensalCreateArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EspelhoMensals.
     * @param {EspelhoMensalCreateManyArgs} args - Arguments to create many EspelhoMensals.
     * @example
     * // Create many EspelhoMensals
     * const espelhoMensal = await prisma.espelhoMensal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EspelhoMensalCreateManyArgs>(args?: SelectSubset<T, EspelhoMensalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EspelhoMensals and returns the data saved in the database.
     * @param {EspelhoMensalCreateManyAndReturnArgs} args - Arguments to create many EspelhoMensals.
     * @example
     * // Create many EspelhoMensals
     * const espelhoMensal = await prisma.espelhoMensal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EspelhoMensals and only return the `id`
     * const espelhoMensalWithIdOnly = await prisma.espelhoMensal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EspelhoMensalCreateManyAndReturnArgs>(args?: SelectSubset<T, EspelhoMensalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EspelhoMensal.
     * @param {EspelhoMensalDeleteArgs} args - Arguments to delete one EspelhoMensal.
     * @example
     * // Delete one EspelhoMensal
     * const EspelhoMensal = await prisma.espelhoMensal.delete({
     *   where: {
     *     // ... filter to delete one EspelhoMensal
     *   }
     * })
     * 
     */
    delete<T extends EspelhoMensalDeleteArgs>(args: SelectSubset<T, EspelhoMensalDeleteArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EspelhoMensal.
     * @param {EspelhoMensalUpdateArgs} args - Arguments to update one EspelhoMensal.
     * @example
     * // Update one EspelhoMensal
     * const espelhoMensal = await prisma.espelhoMensal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EspelhoMensalUpdateArgs>(args: SelectSubset<T, EspelhoMensalUpdateArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EspelhoMensals.
     * @param {EspelhoMensalDeleteManyArgs} args - Arguments to filter EspelhoMensals to delete.
     * @example
     * // Delete a few EspelhoMensals
     * const { count } = await prisma.espelhoMensal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EspelhoMensalDeleteManyArgs>(args?: SelectSubset<T, EspelhoMensalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EspelhoMensals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EspelhoMensals
     * const espelhoMensal = await prisma.espelhoMensal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EspelhoMensalUpdateManyArgs>(args: SelectSubset<T, EspelhoMensalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EspelhoMensals and returns the data updated in the database.
     * @param {EspelhoMensalUpdateManyAndReturnArgs} args - Arguments to update many EspelhoMensals.
     * @example
     * // Update many EspelhoMensals
     * const espelhoMensal = await prisma.espelhoMensal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EspelhoMensals and only return the `id`
     * const espelhoMensalWithIdOnly = await prisma.espelhoMensal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EspelhoMensalUpdateManyAndReturnArgs>(args: SelectSubset<T, EspelhoMensalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EspelhoMensal.
     * @param {EspelhoMensalUpsertArgs} args - Arguments to update or create a EspelhoMensal.
     * @example
     * // Update or create a EspelhoMensal
     * const espelhoMensal = await prisma.espelhoMensal.upsert({
     *   create: {
     *     // ... data to create a EspelhoMensal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EspelhoMensal we want to update
     *   }
     * })
     */
    upsert<T extends EspelhoMensalUpsertArgs>(args: SelectSubset<T, EspelhoMensalUpsertArgs<ExtArgs>>): Prisma__EspelhoMensalClient<$Result.GetResult<Prisma.$EspelhoMensalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EspelhoMensals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalCountArgs} args - Arguments to filter EspelhoMensals to count.
     * @example
     * // Count the number of EspelhoMensals
     * const count = await prisma.espelhoMensal.count({
     *   where: {
     *     // ... the filter for the EspelhoMensals we want to count
     *   }
     * })
    **/
    count<T extends EspelhoMensalCountArgs>(
      args?: Subset<T, EspelhoMensalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EspelhoMensalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EspelhoMensal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EspelhoMensalAggregateArgs>(args: Subset<T, EspelhoMensalAggregateArgs>): Prisma.PrismaPromise<GetEspelhoMensalAggregateType<T>>

    /**
     * Group by EspelhoMensal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspelhoMensalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EspelhoMensalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EspelhoMensalGroupByArgs['orderBy'] }
        : { orderBy?: EspelhoMensalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EspelhoMensalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEspelhoMensalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EspelhoMensal model
   */
  readonly fields: EspelhoMensalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EspelhoMensal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EspelhoMensalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registros<T extends EspelhoMensal$registrosArgs<ExtArgs> = {}>(args?: Subset<T, EspelhoMensal$registrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspelhoDiarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EspelhoMensal model
   */
  interface EspelhoMensalFieldRefs {
    readonly id: FieldRef<"EspelhoMensal", 'Int'>
    readonly cpf: FieldRef<"EspelhoMensal", 'String'>
    readonly mesAno: FieldRef<"EspelhoMensal", 'String'>
    readonly diasUteis: FieldRef<"EspelhoMensal", 'Int'>
    readonly diasTrabalhados: FieldRef<"EspelhoMensal", 'Int'>
    readonly registrosCorretos: FieldRef<"EspelhoMensal", 'Int'>
    readonly ajustesEAbonos: FieldRef<"EspelhoMensal", 'Int'>
    readonly faltas: FieldRef<"EspelhoMensal", 'Int'>
    readonly totalHorasTrabalhadas: FieldRef<"EspelhoMensal", 'Float'>
    readonly totalHorasDevidas: FieldRef<"EspelhoMensal", 'Float'>
    readonly saldoHoras: FieldRef<"EspelhoMensal", 'Float'>
    readonly dataCriacao: FieldRef<"EspelhoMensal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EspelhoMensal findUnique
   */
  export type EspelhoMensalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoMensal to fetch.
     */
    where: EspelhoMensalWhereUniqueInput
  }

  /**
   * EspelhoMensal findUniqueOrThrow
   */
  export type EspelhoMensalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoMensal to fetch.
     */
    where: EspelhoMensalWhereUniqueInput
  }

  /**
   * EspelhoMensal findFirst
   */
  export type EspelhoMensalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoMensal to fetch.
     */
    where?: EspelhoMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoMensals to fetch.
     */
    orderBy?: EspelhoMensalOrderByWithRelationInput | EspelhoMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EspelhoMensals.
     */
    cursor?: EspelhoMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoMensals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EspelhoMensals.
     */
    distinct?: EspelhoMensalScalarFieldEnum | EspelhoMensalScalarFieldEnum[]
  }

  /**
   * EspelhoMensal findFirstOrThrow
   */
  export type EspelhoMensalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoMensal to fetch.
     */
    where?: EspelhoMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoMensals to fetch.
     */
    orderBy?: EspelhoMensalOrderByWithRelationInput | EspelhoMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EspelhoMensals.
     */
    cursor?: EspelhoMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoMensals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EspelhoMensals.
     */
    distinct?: EspelhoMensalScalarFieldEnum | EspelhoMensalScalarFieldEnum[]
  }

  /**
   * EspelhoMensal findMany
   */
  export type EspelhoMensalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * Filter, which EspelhoMensals to fetch.
     */
    where?: EspelhoMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspelhoMensals to fetch.
     */
    orderBy?: EspelhoMensalOrderByWithRelationInput | EspelhoMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EspelhoMensals.
     */
    cursor?: EspelhoMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspelhoMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspelhoMensals.
     */
    skip?: number
    distinct?: EspelhoMensalScalarFieldEnum | EspelhoMensalScalarFieldEnum[]
  }

  /**
   * EspelhoMensal create
   */
  export type EspelhoMensalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * The data needed to create a EspelhoMensal.
     */
    data: XOR<EspelhoMensalCreateInput, EspelhoMensalUncheckedCreateInput>
  }

  /**
   * EspelhoMensal createMany
   */
  export type EspelhoMensalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EspelhoMensals.
     */
    data: EspelhoMensalCreateManyInput | EspelhoMensalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EspelhoMensal createManyAndReturn
   */
  export type EspelhoMensalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * The data used to create many EspelhoMensals.
     */
    data: EspelhoMensalCreateManyInput | EspelhoMensalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EspelhoMensal update
   */
  export type EspelhoMensalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * The data needed to update a EspelhoMensal.
     */
    data: XOR<EspelhoMensalUpdateInput, EspelhoMensalUncheckedUpdateInput>
    /**
     * Choose, which EspelhoMensal to update.
     */
    where: EspelhoMensalWhereUniqueInput
  }

  /**
   * EspelhoMensal updateMany
   */
  export type EspelhoMensalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EspelhoMensals.
     */
    data: XOR<EspelhoMensalUpdateManyMutationInput, EspelhoMensalUncheckedUpdateManyInput>
    /**
     * Filter which EspelhoMensals to update
     */
    where?: EspelhoMensalWhereInput
    /**
     * Limit how many EspelhoMensals to update.
     */
    limit?: number
  }

  /**
   * EspelhoMensal updateManyAndReturn
   */
  export type EspelhoMensalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * The data used to update EspelhoMensals.
     */
    data: XOR<EspelhoMensalUpdateManyMutationInput, EspelhoMensalUncheckedUpdateManyInput>
    /**
     * Filter which EspelhoMensals to update
     */
    where?: EspelhoMensalWhereInput
    /**
     * Limit how many EspelhoMensals to update.
     */
    limit?: number
  }

  /**
   * EspelhoMensal upsert
   */
  export type EspelhoMensalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * The filter to search for the EspelhoMensal to update in case it exists.
     */
    where: EspelhoMensalWhereUniqueInput
    /**
     * In case the EspelhoMensal found by the `where` argument doesn't exist, create a new EspelhoMensal with this data.
     */
    create: XOR<EspelhoMensalCreateInput, EspelhoMensalUncheckedCreateInput>
    /**
     * In case the EspelhoMensal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EspelhoMensalUpdateInput, EspelhoMensalUncheckedUpdateInput>
  }

  /**
   * EspelhoMensal delete
   */
  export type EspelhoMensalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
    /**
     * Filter which EspelhoMensal to delete.
     */
    where: EspelhoMensalWhereUniqueInput
  }

  /**
   * EspelhoMensal deleteMany
   */
  export type EspelhoMensalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EspelhoMensals to delete
     */
    where?: EspelhoMensalWhereInput
    /**
     * Limit how many EspelhoMensals to delete.
     */
    limit?: number
  }

  /**
   * EspelhoMensal.registros
   */
  export type EspelhoMensal$registrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoDiario
     */
    select?: EspelhoDiarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoDiario
     */
    omit?: EspelhoDiarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoDiarioInclude<ExtArgs> | null
    where?: EspelhoDiarioWhereInput
    orderBy?: EspelhoDiarioOrderByWithRelationInput | EspelhoDiarioOrderByWithRelationInput[]
    cursor?: EspelhoDiarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EspelhoDiarioScalarFieldEnum | EspelhoDiarioScalarFieldEnum[]
  }

  /**
   * EspelhoMensal without action
   */
  export type EspelhoMensalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspelhoMensal
     */
    select?: EspelhoMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspelhoMensal
     */
    omit?: EspelhoMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EspelhoMensalInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RegistroTipo1ScalarFieldEnum: {
    id: 'id',
    tipo: 'tipo',
    idSequencial: 'idSequencial',
    tipoIdentificadorEmpregador: 'tipoIdentificadorEmpregador',
    cnpjCpfEmpregador: 'cnpjCpfEmpregador',
    cnoCaepf: 'cnoCaepf',
    razaoSocial: 'razaoSocial',
    numeroFabricacao: 'numeroFabricacao',
    dataInicial: 'dataInicial',
    dataFinal: 'dataFinal',
    dataHoraGeracao: 'dataHoraGeracao',
    versaoLayout: 'versaoLayout',
    tipoIdentificadorFabricante: 'tipoIdentificadorFabricante',
    cnpjCpfFabricante: 'cnpjCpfFabricante',
    modelo: 'modelo',
    crc: 'crc',
    origem: 'origem'
  };

  export type RegistroTipo1ScalarFieldEnum = (typeof RegistroTipo1ScalarFieldEnum)[keyof typeof RegistroTipo1ScalarFieldEnum]


  export const RegistroTipo10ScalarFieldEnum: {
    id: 'id',
    ultimo_nsr: 'ultimo_nsr',
    origem: 'origem'
  };

  export type RegistroTipo10ScalarFieldEnum = (typeof RegistroTipo10ScalarFieldEnum)[keyof typeof RegistroTipo10ScalarFieldEnum]


  export const RegistroTipo3ScalarFieldEnum: {
    id: 'id',
    nsr: 'nsr',
    tipo: 'tipo',
    dataCompleta: 'dataCompleta',
    data: 'data',
    hora: 'hora',
    cpfEmpregado: 'cpfEmpregado',
    crc: 'crc',
    origem: 'origem'
  };

  export type RegistroTipo3ScalarFieldEnum = (typeof RegistroTipo3ScalarFieldEnum)[keyof typeof RegistroTipo3ScalarFieldEnum]


  export const EspelhoDiarioScalarFieldEnum: {
    id: 'id',
    cpf: 'cpf',
    mesAno: 'mesAno',
    diaDoMes: 'diaDoMes',
    credito: 'credito',
    debito: 'debito',
    horasNormais: 'horasNormais',
    horasExtras: 'horasExtras',
    saldo: 'saldo',
    motivoReajuste: 'motivoReajuste',
    data: 'data',
    primeiraEntrada: 'primeiraEntrada',
    primeiraSaida: 'primeiraSaida',
    segundaEntrada: 'segundaEntrada',
    segundaSaida: 'segundaSaida',
    horasTrabalhadas: 'horasTrabalhadas',
    observacoes: 'observacoes',
    status: 'status',
    origem: 'origem'
  };

  export type EspelhoDiarioScalarFieldEnum = (typeof EspelhoDiarioScalarFieldEnum)[keyof typeof EspelhoDiarioScalarFieldEnum]


  export const EspelhoMensalScalarFieldEnum: {
    id: 'id',
    cpf: 'cpf',
    mesAno: 'mesAno',
    diasUteis: 'diasUteis',
    diasTrabalhados: 'diasTrabalhados',
    registrosCorretos: 'registrosCorretos',
    ajustesEAbonos: 'ajustesEAbonos',
    faltas: 'faltas',
    totalHorasTrabalhadas: 'totalHorasTrabalhadas',
    totalHorasDevidas: 'totalHorasDevidas',
    saldoHoras: 'saldoHoras',
    dataCriacao: 'dataCriacao'
  };

  export type EspelhoMensalScalarFieldEnum = (typeof EspelhoMensalScalarFieldEnum)[keyof typeof EspelhoMensalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RegistroTipo1WhereInput = {
    AND?: RegistroTipo1WhereInput | RegistroTipo1WhereInput[]
    OR?: RegistroTipo1WhereInput[]
    NOT?: RegistroTipo1WhereInput | RegistroTipo1WhereInput[]
    id?: StringFilter<"RegistroTipo1"> | string
    tipo?: StringFilter<"RegistroTipo1"> | string
    idSequencial?: StringFilter<"RegistroTipo1"> | string
    tipoIdentificadorEmpregador?: StringFilter<"RegistroTipo1"> | string
    cnpjCpfEmpregador?: StringFilter<"RegistroTipo1"> | string
    cnoCaepf?: StringFilter<"RegistroTipo1"> | string
    razaoSocial?: StringFilter<"RegistroTipo1"> | string
    numeroFabricacao?: StringFilter<"RegistroTipo1"> | string
    dataInicial?: StringFilter<"RegistroTipo1"> | string
    dataFinal?: StringFilter<"RegistroTipo1"> | string
    dataHoraGeracao?: StringFilter<"RegistroTipo1"> | string
    versaoLayout?: StringFilter<"RegistroTipo1"> | string
    tipoIdentificadorFabricante?: StringFilter<"RegistroTipo1"> | string
    cnpjCpfFabricante?: StringFilter<"RegistroTipo1"> | string
    modelo?: StringFilter<"RegistroTipo1"> | string
    crc?: StringFilter<"RegistroTipo1"> | string
    origem?: StringNullableFilter<"RegistroTipo1"> | string | null
  }

  export type RegistroTipo1OrderByWithRelationInput = {
    id?: SortOrder
    tipo?: SortOrder
    idSequencial?: SortOrder
    tipoIdentificadorEmpregador?: SortOrder
    cnpjCpfEmpregador?: SortOrder
    cnoCaepf?: SortOrder
    razaoSocial?: SortOrder
    numeroFabricacao?: SortOrder
    dataInicial?: SortOrder
    dataFinal?: SortOrder
    dataHoraGeracao?: SortOrder
    versaoLayout?: SortOrder
    tipoIdentificadorFabricante?: SortOrder
    cnpjCpfFabricante?: SortOrder
    modelo?: SortOrder
    crc?: SortOrder
    origem?: SortOrderInput | SortOrder
  }

  export type RegistroTipo1WhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RegistroTipo1WhereInput | RegistroTipo1WhereInput[]
    OR?: RegistroTipo1WhereInput[]
    NOT?: RegistroTipo1WhereInput | RegistroTipo1WhereInput[]
    tipo?: StringFilter<"RegistroTipo1"> | string
    idSequencial?: StringFilter<"RegistroTipo1"> | string
    tipoIdentificadorEmpregador?: StringFilter<"RegistroTipo1"> | string
    cnpjCpfEmpregador?: StringFilter<"RegistroTipo1"> | string
    cnoCaepf?: StringFilter<"RegistroTipo1"> | string
    razaoSocial?: StringFilter<"RegistroTipo1"> | string
    numeroFabricacao?: StringFilter<"RegistroTipo1"> | string
    dataInicial?: StringFilter<"RegistroTipo1"> | string
    dataFinal?: StringFilter<"RegistroTipo1"> | string
    dataHoraGeracao?: StringFilter<"RegistroTipo1"> | string
    versaoLayout?: StringFilter<"RegistroTipo1"> | string
    tipoIdentificadorFabricante?: StringFilter<"RegistroTipo1"> | string
    cnpjCpfFabricante?: StringFilter<"RegistroTipo1"> | string
    modelo?: StringFilter<"RegistroTipo1"> | string
    crc?: StringFilter<"RegistroTipo1"> | string
    origem?: StringNullableFilter<"RegistroTipo1"> | string | null
  }, "id">

  export type RegistroTipo1OrderByWithAggregationInput = {
    id?: SortOrder
    tipo?: SortOrder
    idSequencial?: SortOrder
    tipoIdentificadorEmpregador?: SortOrder
    cnpjCpfEmpregador?: SortOrder
    cnoCaepf?: SortOrder
    razaoSocial?: SortOrder
    numeroFabricacao?: SortOrder
    dataInicial?: SortOrder
    dataFinal?: SortOrder
    dataHoraGeracao?: SortOrder
    versaoLayout?: SortOrder
    tipoIdentificadorFabricante?: SortOrder
    cnpjCpfFabricante?: SortOrder
    modelo?: SortOrder
    crc?: SortOrder
    origem?: SortOrderInput | SortOrder
    _count?: RegistroTipo1CountOrderByAggregateInput
    _max?: RegistroTipo1MaxOrderByAggregateInput
    _min?: RegistroTipo1MinOrderByAggregateInput
  }

  export type RegistroTipo1ScalarWhereWithAggregatesInput = {
    AND?: RegistroTipo1ScalarWhereWithAggregatesInput | RegistroTipo1ScalarWhereWithAggregatesInput[]
    OR?: RegistroTipo1ScalarWhereWithAggregatesInput[]
    NOT?: RegistroTipo1ScalarWhereWithAggregatesInput | RegistroTipo1ScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    tipo?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    idSequencial?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    tipoIdentificadorEmpregador?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    cnpjCpfEmpregador?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    cnoCaepf?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    razaoSocial?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    numeroFabricacao?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    dataInicial?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    dataFinal?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    dataHoraGeracao?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    versaoLayout?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    tipoIdentificadorFabricante?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    cnpjCpfFabricante?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    modelo?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    crc?: StringWithAggregatesFilter<"RegistroTipo1"> | string
    origem?: StringNullableWithAggregatesFilter<"RegistroTipo1"> | string | null
  }

  export type RegistroTipo10WhereInput = {
    AND?: RegistroTipo10WhereInput | RegistroTipo10WhereInput[]
    OR?: RegistroTipo10WhereInput[]
    NOT?: RegistroTipo10WhereInput | RegistroTipo10WhereInput[]
    id?: StringFilter<"RegistroTipo10"> | string
    ultimo_nsr?: IntFilter<"RegistroTipo10"> | number
    origem?: StringFilter<"RegistroTipo10"> | string
  }

  export type RegistroTipo10OrderByWithRelationInput = {
    id?: SortOrder
    ultimo_nsr?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo10WhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ultimo_nsr?: number
    origem?: string
    AND?: RegistroTipo10WhereInput | RegistroTipo10WhereInput[]
    OR?: RegistroTipo10WhereInput[]
    NOT?: RegistroTipo10WhereInput | RegistroTipo10WhereInput[]
  }, "id" | "origem" | "ultimo_nsr">

  export type RegistroTipo10OrderByWithAggregationInput = {
    id?: SortOrder
    ultimo_nsr?: SortOrder
    origem?: SortOrder
    _count?: RegistroTipo10CountOrderByAggregateInput
    _avg?: RegistroTipo10AvgOrderByAggregateInput
    _max?: RegistroTipo10MaxOrderByAggregateInput
    _min?: RegistroTipo10MinOrderByAggregateInput
    _sum?: RegistroTipo10SumOrderByAggregateInput
  }

  export type RegistroTipo10ScalarWhereWithAggregatesInput = {
    AND?: RegistroTipo10ScalarWhereWithAggregatesInput | RegistroTipo10ScalarWhereWithAggregatesInput[]
    OR?: RegistroTipo10ScalarWhereWithAggregatesInput[]
    NOT?: RegistroTipo10ScalarWhereWithAggregatesInput | RegistroTipo10ScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RegistroTipo10"> | string
    ultimo_nsr?: IntWithAggregatesFilter<"RegistroTipo10"> | number
    origem?: StringWithAggregatesFilter<"RegistroTipo10"> | string
  }

  export type RegistroTipo3WhereInput = {
    AND?: RegistroTipo3WhereInput | RegistroTipo3WhereInput[]
    OR?: RegistroTipo3WhereInput[]
    NOT?: RegistroTipo3WhereInput | RegistroTipo3WhereInput[]
    id?: StringFilter<"RegistroTipo3"> | string
    nsr?: IntFilter<"RegistroTipo3"> | number
    tipo?: StringFilter<"RegistroTipo3"> | string
    dataCompleta?: DateTimeFilter<"RegistroTipo3"> | Date | string
    data?: StringFilter<"RegistroTipo3"> | string
    hora?: StringFilter<"RegistroTipo3"> | string
    cpfEmpregado?: StringFilter<"RegistroTipo3"> | string
    crc?: StringFilter<"RegistroTipo3"> | string
    origem?: StringNullableFilter<"RegistroTipo3"> | string | null
  }

  export type RegistroTipo3OrderByWithRelationInput = {
    id?: SortOrder
    nsr?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    cpfEmpregado?: SortOrder
    crc?: SortOrder
    origem?: SortOrderInput | SortOrder
  }

  export type RegistroTipo3WhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nsr_cpfEmpregado_data_hora_origem?: RegistroTipo3NsrCpfEmpregadoDataHoraOrigemCompoundUniqueInput
    AND?: RegistroTipo3WhereInput | RegistroTipo3WhereInput[]
    OR?: RegistroTipo3WhereInput[]
    NOT?: RegistroTipo3WhereInput | RegistroTipo3WhereInput[]
    nsr?: IntFilter<"RegistroTipo3"> | number
    tipo?: StringFilter<"RegistroTipo3"> | string
    dataCompleta?: DateTimeFilter<"RegistroTipo3"> | Date | string
    data?: StringFilter<"RegistroTipo3"> | string
    hora?: StringFilter<"RegistroTipo3"> | string
    cpfEmpregado?: StringFilter<"RegistroTipo3"> | string
    crc?: StringFilter<"RegistroTipo3"> | string
    origem?: StringNullableFilter<"RegistroTipo3"> | string | null
  }, "id" | "nsr_cpfEmpregado_data_hora_origem">

  export type RegistroTipo3OrderByWithAggregationInput = {
    id?: SortOrder
    nsr?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    cpfEmpregado?: SortOrder
    crc?: SortOrder
    origem?: SortOrderInput | SortOrder
    _count?: RegistroTipo3CountOrderByAggregateInput
    _avg?: RegistroTipo3AvgOrderByAggregateInput
    _max?: RegistroTipo3MaxOrderByAggregateInput
    _min?: RegistroTipo3MinOrderByAggregateInput
    _sum?: RegistroTipo3SumOrderByAggregateInput
  }

  export type RegistroTipo3ScalarWhereWithAggregatesInput = {
    AND?: RegistroTipo3ScalarWhereWithAggregatesInput | RegistroTipo3ScalarWhereWithAggregatesInput[]
    OR?: RegistroTipo3ScalarWhereWithAggregatesInput[]
    NOT?: RegistroTipo3ScalarWhereWithAggregatesInput | RegistroTipo3ScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RegistroTipo3"> | string
    nsr?: IntWithAggregatesFilter<"RegistroTipo3"> | number
    tipo?: StringWithAggregatesFilter<"RegistroTipo3"> | string
    dataCompleta?: DateTimeWithAggregatesFilter<"RegistroTipo3"> | Date | string
    data?: StringWithAggregatesFilter<"RegistroTipo3"> | string
    hora?: StringWithAggregatesFilter<"RegistroTipo3"> | string
    cpfEmpregado?: StringWithAggregatesFilter<"RegistroTipo3"> | string
    crc?: StringWithAggregatesFilter<"RegistroTipo3"> | string
    origem?: StringNullableWithAggregatesFilter<"RegistroTipo3"> | string | null
  }

  export type EspelhoDiarioWhereInput = {
    AND?: EspelhoDiarioWhereInput | EspelhoDiarioWhereInput[]
    OR?: EspelhoDiarioWhereInput[]
    NOT?: EspelhoDiarioWhereInput | EspelhoDiarioWhereInput[]
    id?: IntFilter<"EspelhoDiario"> | number
    cpf?: StringFilter<"EspelhoDiario"> | string
    mesAno?: StringFilter<"EspelhoDiario"> | string
    diaDoMes?: StringFilter<"EspelhoDiario"> | string
    credito?: FloatFilter<"EspelhoDiario"> | number
    debito?: FloatFilter<"EspelhoDiario"> | number
    horasNormais?: FloatFilter<"EspelhoDiario"> | number
    horasExtras?: FloatFilter<"EspelhoDiario"> | number
    saldo?: FloatFilter<"EspelhoDiario"> | number
    motivoReajuste?: StringNullableFilter<"EspelhoDiario"> | string | null
    data?: StringFilter<"EspelhoDiario"> | string
    primeiraEntrada?: StringNullableFilter<"EspelhoDiario"> | string | null
    primeiraSaida?: StringNullableFilter<"EspelhoDiario"> | string | null
    segundaEntrada?: StringNullableFilter<"EspelhoDiario"> | string | null
    segundaSaida?: StringNullableFilter<"EspelhoDiario"> | string | null
    horasTrabalhadas?: FloatFilter<"EspelhoDiario"> | number
    observacoes?: StringFilter<"EspelhoDiario"> | string
    status?: StringFilter<"EspelhoDiario"> | string
    origem?: StringNullableFilter<"EspelhoDiario"> | string | null
    EspelhoMensal?: EspelhoMensalListRelationFilter
  }

  export type EspelhoDiarioOrderByWithRelationInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diaDoMes?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    motivoReajuste?: SortOrderInput | SortOrder
    data?: SortOrder
    primeiraEntrada?: SortOrderInput | SortOrder
    primeiraSaida?: SortOrderInput | SortOrder
    segundaEntrada?: SortOrderInput | SortOrder
    segundaSaida?: SortOrderInput | SortOrder
    horasTrabalhadas?: SortOrder
    observacoes?: SortOrder
    status?: SortOrder
    origem?: SortOrderInput | SortOrder
    EspelhoMensal?: EspelhoMensalOrderByRelationAggregateInput
  }

  export type EspelhoDiarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EspelhoDiarioWhereInput | EspelhoDiarioWhereInput[]
    OR?: EspelhoDiarioWhereInput[]
    NOT?: EspelhoDiarioWhereInput | EspelhoDiarioWhereInput[]
    cpf?: StringFilter<"EspelhoDiario"> | string
    mesAno?: StringFilter<"EspelhoDiario"> | string
    diaDoMes?: StringFilter<"EspelhoDiario"> | string
    credito?: FloatFilter<"EspelhoDiario"> | number
    debito?: FloatFilter<"EspelhoDiario"> | number
    horasNormais?: FloatFilter<"EspelhoDiario"> | number
    horasExtras?: FloatFilter<"EspelhoDiario"> | number
    saldo?: FloatFilter<"EspelhoDiario"> | number
    motivoReajuste?: StringNullableFilter<"EspelhoDiario"> | string | null
    data?: StringFilter<"EspelhoDiario"> | string
    primeiraEntrada?: StringNullableFilter<"EspelhoDiario"> | string | null
    primeiraSaida?: StringNullableFilter<"EspelhoDiario"> | string | null
    segundaEntrada?: StringNullableFilter<"EspelhoDiario"> | string | null
    segundaSaida?: StringNullableFilter<"EspelhoDiario"> | string | null
    horasTrabalhadas?: FloatFilter<"EspelhoDiario"> | number
    observacoes?: StringFilter<"EspelhoDiario"> | string
    status?: StringFilter<"EspelhoDiario"> | string
    origem?: StringNullableFilter<"EspelhoDiario"> | string | null
    EspelhoMensal?: EspelhoMensalListRelationFilter
  }, "id">

  export type EspelhoDiarioOrderByWithAggregationInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diaDoMes?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    motivoReajuste?: SortOrderInput | SortOrder
    data?: SortOrder
    primeiraEntrada?: SortOrderInput | SortOrder
    primeiraSaida?: SortOrderInput | SortOrder
    segundaEntrada?: SortOrderInput | SortOrder
    segundaSaida?: SortOrderInput | SortOrder
    horasTrabalhadas?: SortOrder
    observacoes?: SortOrder
    status?: SortOrder
    origem?: SortOrderInput | SortOrder
    _count?: EspelhoDiarioCountOrderByAggregateInput
    _avg?: EspelhoDiarioAvgOrderByAggregateInput
    _max?: EspelhoDiarioMaxOrderByAggregateInput
    _min?: EspelhoDiarioMinOrderByAggregateInput
    _sum?: EspelhoDiarioSumOrderByAggregateInput
  }

  export type EspelhoDiarioScalarWhereWithAggregatesInput = {
    AND?: EspelhoDiarioScalarWhereWithAggregatesInput | EspelhoDiarioScalarWhereWithAggregatesInput[]
    OR?: EspelhoDiarioScalarWhereWithAggregatesInput[]
    NOT?: EspelhoDiarioScalarWhereWithAggregatesInput | EspelhoDiarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EspelhoDiario"> | number
    cpf?: StringWithAggregatesFilter<"EspelhoDiario"> | string
    mesAno?: StringWithAggregatesFilter<"EspelhoDiario"> | string
    diaDoMes?: StringWithAggregatesFilter<"EspelhoDiario"> | string
    credito?: FloatWithAggregatesFilter<"EspelhoDiario"> | number
    debito?: FloatWithAggregatesFilter<"EspelhoDiario"> | number
    horasNormais?: FloatWithAggregatesFilter<"EspelhoDiario"> | number
    horasExtras?: FloatWithAggregatesFilter<"EspelhoDiario"> | number
    saldo?: FloatWithAggregatesFilter<"EspelhoDiario"> | number
    motivoReajuste?: StringNullableWithAggregatesFilter<"EspelhoDiario"> | string | null
    data?: StringWithAggregatesFilter<"EspelhoDiario"> | string
    primeiraEntrada?: StringNullableWithAggregatesFilter<"EspelhoDiario"> | string | null
    primeiraSaida?: StringNullableWithAggregatesFilter<"EspelhoDiario"> | string | null
    segundaEntrada?: StringNullableWithAggregatesFilter<"EspelhoDiario"> | string | null
    segundaSaida?: StringNullableWithAggregatesFilter<"EspelhoDiario"> | string | null
    horasTrabalhadas?: FloatWithAggregatesFilter<"EspelhoDiario"> | number
    observacoes?: StringWithAggregatesFilter<"EspelhoDiario"> | string
    status?: StringWithAggregatesFilter<"EspelhoDiario"> | string
    origem?: StringNullableWithAggregatesFilter<"EspelhoDiario"> | string | null
  }

  export type EspelhoMensalWhereInput = {
    AND?: EspelhoMensalWhereInput | EspelhoMensalWhereInput[]
    OR?: EspelhoMensalWhereInput[]
    NOT?: EspelhoMensalWhereInput | EspelhoMensalWhereInput[]
    id?: IntFilter<"EspelhoMensal"> | number
    cpf?: StringFilter<"EspelhoMensal"> | string
    mesAno?: StringFilter<"EspelhoMensal"> | string
    diasUteis?: IntFilter<"EspelhoMensal"> | number
    diasTrabalhados?: IntFilter<"EspelhoMensal"> | number
    registrosCorretos?: IntNullableFilter<"EspelhoMensal"> | number | null
    ajustesEAbonos?: IntNullableFilter<"EspelhoMensal"> | number | null
    faltas?: IntNullableFilter<"EspelhoMensal"> | number | null
    totalHorasTrabalhadas?: FloatFilter<"EspelhoMensal"> | number
    totalHorasDevidas?: FloatFilter<"EspelhoMensal"> | number
    saldoHoras?: FloatFilter<"EspelhoMensal"> | number
    dataCriacao?: DateTimeFilter<"EspelhoMensal"> | Date | string
    registros?: EspelhoDiarioListRelationFilter
  }

  export type EspelhoMensalOrderByWithRelationInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrderInput | SortOrder
    ajustesEAbonos?: SortOrderInput | SortOrder
    faltas?: SortOrderInput | SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
    dataCriacao?: SortOrder
    registros?: EspelhoDiarioOrderByRelationAggregateInput
  }

  export type EspelhoMensalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cpf_mesAno?: EspelhoMensalCpfMesAnoCompoundUniqueInput
    AND?: EspelhoMensalWhereInput | EspelhoMensalWhereInput[]
    OR?: EspelhoMensalWhereInput[]
    NOT?: EspelhoMensalWhereInput | EspelhoMensalWhereInput[]
    cpf?: StringFilter<"EspelhoMensal"> | string
    mesAno?: StringFilter<"EspelhoMensal"> | string
    diasUteis?: IntFilter<"EspelhoMensal"> | number
    diasTrabalhados?: IntFilter<"EspelhoMensal"> | number
    registrosCorretos?: IntNullableFilter<"EspelhoMensal"> | number | null
    ajustesEAbonos?: IntNullableFilter<"EspelhoMensal"> | number | null
    faltas?: IntNullableFilter<"EspelhoMensal"> | number | null
    totalHorasTrabalhadas?: FloatFilter<"EspelhoMensal"> | number
    totalHorasDevidas?: FloatFilter<"EspelhoMensal"> | number
    saldoHoras?: FloatFilter<"EspelhoMensal"> | number
    dataCriacao?: DateTimeFilter<"EspelhoMensal"> | Date | string
    registros?: EspelhoDiarioListRelationFilter
  }, "id" | "cpf_mesAno">

  export type EspelhoMensalOrderByWithAggregationInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrderInput | SortOrder
    ajustesEAbonos?: SortOrderInput | SortOrder
    faltas?: SortOrderInput | SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
    dataCriacao?: SortOrder
    _count?: EspelhoMensalCountOrderByAggregateInput
    _avg?: EspelhoMensalAvgOrderByAggregateInput
    _max?: EspelhoMensalMaxOrderByAggregateInput
    _min?: EspelhoMensalMinOrderByAggregateInput
    _sum?: EspelhoMensalSumOrderByAggregateInput
  }

  export type EspelhoMensalScalarWhereWithAggregatesInput = {
    AND?: EspelhoMensalScalarWhereWithAggregatesInput | EspelhoMensalScalarWhereWithAggregatesInput[]
    OR?: EspelhoMensalScalarWhereWithAggregatesInput[]
    NOT?: EspelhoMensalScalarWhereWithAggregatesInput | EspelhoMensalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EspelhoMensal"> | number
    cpf?: StringWithAggregatesFilter<"EspelhoMensal"> | string
    mesAno?: StringWithAggregatesFilter<"EspelhoMensal"> | string
    diasUteis?: IntWithAggregatesFilter<"EspelhoMensal"> | number
    diasTrabalhados?: IntWithAggregatesFilter<"EspelhoMensal"> | number
    registrosCorretos?: IntNullableWithAggregatesFilter<"EspelhoMensal"> | number | null
    ajustesEAbonos?: IntNullableWithAggregatesFilter<"EspelhoMensal"> | number | null
    faltas?: IntNullableWithAggregatesFilter<"EspelhoMensal"> | number | null
    totalHorasTrabalhadas?: FloatWithAggregatesFilter<"EspelhoMensal"> | number
    totalHorasDevidas?: FloatWithAggregatesFilter<"EspelhoMensal"> | number
    saldoHoras?: FloatWithAggregatesFilter<"EspelhoMensal"> | number
    dataCriacao?: DateTimeWithAggregatesFilter<"EspelhoMensal"> | Date | string
  }

  export type RegistroTipo1CreateInput = {
    id?: string
    tipo: string
    idSequencial: string
    tipoIdentificadorEmpregador: string
    cnpjCpfEmpregador: string
    cnoCaepf: string
    razaoSocial: string
    numeroFabricacao: string
    dataInicial: string
    dataFinal: string
    dataHoraGeracao: string
    versaoLayout: string
    tipoIdentificadorFabricante: string
    cnpjCpfFabricante: string
    modelo: string
    crc: string
    origem?: string | null
  }

  export type RegistroTipo1UncheckedCreateInput = {
    id?: string
    tipo: string
    idSequencial: string
    tipoIdentificadorEmpregador: string
    cnpjCpfEmpregador: string
    cnoCaepf: string
    razaoSocial: string
    numeroFabricacao: string
    dataInicial: string
    dataFinal: string
    dataHoraGeracao: string
    versaoLayout: string
    tipoIdentificadorFabricante: string
    cnpjCpfFabricante: string
    modelo: string
    crc: string
    origem?: string | null
  }

  export type RegistroTipo1UpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    idSequencial?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorEmpregador?: StringFieldUpdateOperationsInput | string
    cnpjCpfEmpregador?: StringFieldUpdateOperationsInput | string
    cnoCaepf?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    numeroFabricacao?: StringFieldUpdateOperationsInput | string
    dataInicial?: StringFieldUpdateOperationsInput | string
    dataFinal?: StringFieldUpdateOperationsInput | string
    dataHoraGeracao?: StringFieldUpdateOperationsInput | string
    versaoLayout?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorFabricante?: StringFieldUpdateOperationsInput | string
    cnpjCpfFabricante?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo1UncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    idSequencial?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorEmpregador?: StringFieldUpdateOperationsInput | string
    cnpjCpfEmpregador?: StringFieldUpdateOperationsInput | string
    cnoCaepf?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    numeroFabricacao?: StringFieldUpdateOperationsInput | string
    dataInicial?: StringFieldUpdateOperationsInput | string
    dataFinal?: StringFieldUpdateOperationsInput | string
    dataHoraGeracao?: StringFieldUpdateOperationsInput | string
    versaoLayout?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorFabricante?: StringFieldUpdateOperationsInput | string
    cnpjCpfFabricante?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo1CreateManyInput = {
    id?: string
    tipo: string
    idSequencial: string
    tipoIdentificadorEmpregador: string
    cnpjCpfEmpregador: string
    cnoCaepf: string
    razaoSocial: string
    numeroFabricacao: string
    dataInicial: string
    dataFinal: string
    dataHoraGeracao: string
    versaoLayout: string
    tipoIdentificadorFabricante: string
    cnpjCpfFabricante: string
    modelo: string
    crc: string
    origem?: string | null
  }

  export type RegistroTipo1UpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    idSequencial?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorEmpregador?: StringFieldUpdateOperationsInput | string
    cnpjCpfEmpregador?: StringFieldUpdateOperationsInput | string
    cnoCaepf?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    numeroFabricacao?: StringFieldUpdateOperationsInput | string
    dataInicial?: StringFieldUpdateOperationsInput | string
    dataFinal?: StringFieldUpdateOperationsInput | string
    dataHoraGeracao?: StringFieldUpdateOperationsInput | string
    versaoLayout?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorFabricante?: StringFieldUpdateOperationsInput | string
    cnpjCpfFabricante?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo1UncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    idSequencial?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorEmpregador?: StringFieldUpdateOperationsInput | string
    cnpjCpfEmpregador?: StringFieldUpdateOperationsInput | string
    cnoCaepf?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    numeroFabricacao?: StringFieldUpdateOperationsInput | string
    dataInicial?: StringFieldUpdateOperationsInput | string
    dataFinal?: StringFieldUpdateOperationsInput | string
    dataHoraGeracao?: StringFieldUpdateOperationsInput | string
    versaoLayout?: StringFieldUpdateOperationsInput | string
    tipoIdentificadorFabricante?: StringFieldUpdateOperationsInput | string
    cnpjCpfFabricante?: StringFieldUpdateOperationsInput | string
    modelo?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo10CreateInput = {
    id?: string
    ultimo_nsr: number
    origem: string
  }

  export type RegistroTipo10UncheckedCreateInput = {
    id?: string
    ultimo_nsr: number
    origem: string
  }

  export type RegistroTipo10UpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimo_nsr?: IntFieldUpdateOperationsInput | number
    origem?: StringFieldUpdateOperationsInput | string
  }

  export type RegistroTipo10UncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimo_nsr?: IntFieldUpdateOperationsInput | number
    origem?: StringFieldUpdateOperationsInput | string
  }

  export type RegistroTipo10CreateManyInput = {
    id?: string
    ultimo_nsr: number
    origem: string
  }

  export type RegistroTipo10UpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimo_nsr?: IntFieldUpdateOperationsInput | number
    origem?: StringFieldUpdateOperationsInput | string
  }

  export type RegistroTipo10UncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimo_nsr?: IntFieldUpdateOperationsInput | number
    origem?: StringFieldUpdateOperationsInput | string
  }

  export type RegistroTipo3CreateInput = {
    id?: string
    nsr: number
    tipo: string
    dataCompleta: Date | string
    data: string
    hora: string
    cpfEmpregado: string
    crc: string
    origem?: string | null
  }

  export type RegistroTipo3UncheckedCreateInput = {
    id?: string
    nsr: number
    tipo: string
    dataCompleta: Date | string
    data: string
    hora: string
    cpfEmpregado: string
    crc: string
    origem?: string | null
  }

  export type RegistroTipo3UpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nsr?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    cpfEmpregado?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo3UncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nsr?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    cpfEmpregado?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo3CreateManyInput = {
    id?: string
    nsr: number
    tipo: string
    dataCompleta: Date | string
    data: string
    hora: string
    cpfEmpregado: string
    crc: string
    origem?: string | null
  }

  export type RegistroTipo3UpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nsr?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    cpfEmpregado?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RegistroTipo3UncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nsr?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    dataCompleta?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    cpfEmpregado?: StringFieldUpdateOperationsInput | string
    crc?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspelhoDiarioCreateInput = {
    cpf: string
    mesAno: string
    diaDoMes: string
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste?: string | null
    data: string
    primeiraEntrada?: string | null
    primeiraSaida?: string | null
    segundaEntrada?: string | null
    segundaSaida?: string | null
    horasTrabalhadas: number
    observacoes: string
    status: string
    origem?: string | null
    EspelhoMensal?: EspelhoMensalCreateNestedManyWithoutRegistrosInput
  }

  export type EspelhoDiarioUncheckedCreateInput = {
    id?: number
    cpf: string
    mesAno: string
    diaDoMes: string
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste?: string | null
    data: string
    primeiraEntrada?: string | null
    primeiraSaida?: string | null
    segundaEntrada?: string | null
    segundaSaida?: string | null
    horasTrabalhadas: number
    observacoes: string
    status: string
    origem?: string | null
    EspelhoMensal?: EspelhoMensalUncheckedCreateNestedManyWithoutRegistrosInput
  }

  export type EspelhoDiarioUpdateInput = {
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
    EspelhoMensal?: EspelhoMensalUpdateManyWithoutRegistrosNestedInput
  }

  export type EspelhoDiarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
    EspelhoMensal?: EspelhoMensalUncheckedUpdateManyWithoutRegistrosNestedInput
  }

  export type EspelhoDiarioCreateManyInput = {
    id?: number
    cpf: string
    mesAno: string
    diaDoMes: string
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste?: string | null
    data: string
    primeiraEntrada?: string | null
    primeiraSaida?: string | null
    segundaEntrada?: string | null
    segundaSaida?: string | null
    horasTrabalhadas: number
    observacoes: string
    status: string
    origem?: string | null
  }

  export type EspelhoDiarioUpdateManyMutationInput = {
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspelhoDiarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspelhoMensalCreateInput = {
    cpf: string
    mesAno: string
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos?: number | null
    ajustesEAbonos?: number | null
    faltas?: number | null
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao?: Date | string
    registros?: EspelhoDiarioCreateNestedManyWithoutEspelhoMensalInput
  }

  export type EspelhoMensalUncheckedCreateInput = {
    id?: number
    cpf: string
    mesAno: string
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos?: number | null
    ajustesEAbonos?: number | null
    faltas?: number | null
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao?: Date | string
    registros?: EspelhoDiarioUncheckedCreateNestedManyWithoutEspelhoMensalInput
  }

  export type EspelhoMensalUpdateInput = {
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    registros?: EspelhoDiarioUpdateManyWithoutEspelhoMensalNestedInput
  }

  export type EspelhoMensalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    registros?: EspelhoDiarioUncheckedUpdateManyWithoutEspelhoMensalNestedInput
  }

  export type EspelhoMensalCreateManyInput = {
    id?: number
    cpf: string
    mesAno: string
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos?: number | null
    ajustesEAbonos?: number | null
    faltas?: number | null
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao?: Date | string
  }

  export type EspelhoMensalUpdateManyMutationInput = {
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EspelhoMensalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RegistroTipo1CountOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    idSequencial?: SortOrder
    tipoIdentificadorEmpregador?: SortOrder
    cnpjCpfEmpregador?: SortOrder
    cnoCaepf?: SortOrder
    razaoSocial?: SortOrder
    numeroFabricacao?: SortOrder
    dataInicial?: SortOrder
    dataFinal?: SortOrder
    dataHoraGeracao?: SortOrder
    versaoLayout?: SortOrder
    tipoIdentificadorFabricante?: SortOrder
    cnpjCpfFabricante?: SortOrder
    modelo?: SortOrder
    crc?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo1MaxOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    idSequencial?: SortOrder
    tipoIdentificadorEmpregador?: SortOrder
    cnpjCpfEmpregador?: SortOrder
    cnoCaepf?: SortOrder
    razaoSocial?: SortOrder
    numeroFabricacao?: SortOrder
    dataInicial?: SortOrder
    dataFinal?: SortOrder
    dataHoraGeracao?: SortOrder
    versaoLayout?: SortOrder
    tipoIdentificadorFabricante?: SortOrder
    cnpjCpfFabricante?: SortOrder
    modelo?: SortOrder
    crc?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo1MinOrderByAggregateInput = {
    id?: SortOrder
    tipo?: SortOrder
    idSequencial?: SortOrder
    tipoIdentificadorEmpregador?: SortOrder
    cnpjCpfEmpregador?: SortOrder
    cnoCaepf?: SortOrder
    razaoSocial?: SortOrder
    numeroFabricacao?: SortOrder
    dataInicial?: SortOrder
    dataFinal?: SortOrder
    dataHoraGeracao?: SortOrder
    versaoLayout?: SortOrder
    tipoIdentificadorFabricante?: SortOrder
    cnpjCpfFabricante?: SortOrder
    modelo?: SortOrder
    crc?: SortOrder
    origem?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RegistroTipo10CountOrderByAggregateInput = {
    id?: SortOrder
    ultimo_nsr?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo10AvgOrderByAggregateInput = {
    ultimo_nsr?: SortOrder
  }

  export type RegistroTipo10MaxOrderByAggregateInput = {
    id?: SortOrder
    ultimo_nsr?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo10MinOrderByAggregateInput = {
    id?: SortOrder
    ultimo_nsr?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo10SumOrderByAggregateInput = {
    ultimo_nsr?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RegistroTipo3NsrCpfEmpregadoDataHoraOrigemCompoundUniqueInput = {
    nsr: number
    cpfEmpregado: string
    data: string
    hora: string
    origem: string
  }

  export type RegistroTipo3CountOrderByAggregateInput = {
    id?: SortOrder
    nsr?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    cpfEmpregado?: SortOrder
    crc?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo3AvgOrderByAggregateInput = {
    nsr?: SortOrder
  }

  export type RegistroTipo3MaxOrderByAggregateInput = {
    id?: SortOrder
    nsr?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    cpfEmpregado?: SortOrder
    crc?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo3MinOrderByAggregateInput = {
    id?: SortOrder
    nsr?: SortOrder
    tipo?: SortOrder
    dataCompleta?: SortOrder
    data?: SortOrder
    hora?: SortOrder
    cpfEmpregado?: SortOrder
    crc?: SortOrder
    origem?: SortOrder
  }

  export type RegistroTipo3SumOrderByAggregateInput = {
    nsr?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EspelhoMensalListRelationFilter = {
    every?: EspelhoMensalWhereInput
    some?: EspelhoMensalWhereInput
    none?: EspelhoMensalWhereInput
  }

  export type EspelhoMensalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EspelhoDiarioCountOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diaDoMes?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    motivoReajuste?: SortOrder
    data?: SortOrder
    primeiraEntrada?: SortOrder
    primeiraSaida?: SortOrder
    segundaEntrada?: SortOrder
    segundaSaida?: SortOrder
    horasTrabalhadas?: SortOrder
    observacoes?: SortOrder
    status?: SortOrder
    origem?: SortOrder
  }

  export type EspelhoDiarioAvgOrderByAggregateInput = {
    id?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    horasTrabalhadas?: SortOrder
  }

  export type EspelhoDiarioMaxOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diaDoMes?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    motivoReajuste?: SortOrder
    data?: SortOrder
    primeiraEntrada?: SortOrder
    primeiraSaida?: SortOrder
    segundaEntrada?: SortOrder
    segundaSaida?: SortOrder
    horasTrabalhadas?: SortOrder
    observacoes?: SortOrder
    status?: SortOrder
    origem?: SortOrder
  }

  export type EspelhoDiarioMinOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diaDoMes?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    motivoReajuste?: SortOrder
    data?: SortOrder
    primeiraEntrada?: SortOrder
    primeiraSaida?: SortOrder
    segundaEntrada?: SortOrder
    segundaSaida?: SortOrder
    horasTrabalhadas?: SortOrder
    observacoes?: SortOrder
    status?: SortOrder
    origem?: SortOrder
  }

  export type EspelhoDiarioSumOrderByAggregateInput = {
    id?: SortOrder
    credito?: SortOrder
    debito?: SortOrder
    horasNormais?: SortOrder
    horasExtras?: SortOrder
    saldo?: SortOrder
    horasTrabalhadas?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EspelhoDiarioListRelationFilter = {
    every?: EspelhoDiarioWhereInput
    some?: EspelhoDiarioWhereInput
    none?: EspelhoDiarioWhereInput
  }

  export type EspelhoDiarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EspelhoMensalCpfMesAnoCompoundUniqueInput = {
    cpf: string
    mesAno: string
  }

  export type EspelhoMensalCountOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrder
    ajustesEAbonos?: SortOrder
    faltas?: SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
    dataCriacao?: SortOrder
  }

  export type EspelhoMensalAvgOrderByAggregateInput = {
    id?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrder
    ajustesEAbonos?: SortOrder
    faltas?: SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
  }

  export type EspelhoMensalMaxOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrder
    ajustesEAbonos?: SortOrder
    faltas?: SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
    dataCriacao?: SortOrder
  }

  export type EspelhoMensalMinOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    mesAno?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrder
    ajustesEAbonos?: SortOrder
    faltas?: SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
    dataCriacao?: SortOrder
  }

  export type EspelhoMensalSumOrderByAggregateInput = {
    id?: SortOrder
    diasUteis?: SortOrder
    diasTrabalhados?: SortOrder
    registrosCorretos?: SortOrder
    ajustesEAbonos?: SortOrder
    faltas?: SortOrder
    totalHorasTrabalhadas?: SortOrder
    totalHorasDevidas?: SortOrder
    saldoHoras?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EspelhoMensalCreateNestedManyWithoutRegistrosInput = {
    create?: XOR<EspelhoMensalCreateWithoutRegistrosInput, EspelhoMensalUncheckedCreateWithoutRegistrosInput> | EspelhoMensalCreateWithoutRegistrosInput[] | EspelhoMensalUncheckedCreateWithoutRegistrosInput[]
    connectOrCreate?: EspelhoMensalCreateOrConnectWithoutRegistrosInput | EspelhoMensalCreateOrConnectWithoutRegistrosInput[]
    connect?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
  }

  export type EspelhoMensalUncheckedCreateNestedManyWithoutRegistrosInput = {
    create?: XOR<EspelhoMensalCreateWithoutRegistrosInput, EspelhoMensalUncheckedCreateWithoutRegistrosInput> | EspelhoMensalCreateWithoutRegistrosInput[] | EspelhoMensalUncheckedCreateWithoutRegistrosInput[]
    connectOrCreate?: EspelhoMensalCreateOrConnectWithoutRegistrosInput | EspelhoMensalCreateOrConnectWithoutRegistrosInput[]
    connect?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EspelhoMensalUpdateManyWithoutRegistrosNestedInput = {
    create?: XOR<EspelhoMensalCreateWithoutRegistrosInput, EspelhoMensalUncheckedCreateWithoutRegistrosInput> | EspelhoMensalCreateWithoutRegistrosInput[] | EspelhoMensalUncheckedCreateWithoutRegistrosInput[]
    connectOrCreate?: EspelhoMensalCreateOrConnectWithoutRegistrosInput | EspelhoMensalCreateOrConnectWithoutRegistrosInput[]
    upsert?: EspelhoMensalUpsertWithWhereUniqueWithoutRegistrosInput | EspelhoMensalUpsertWithWhereUniqueWithoutRegistrosInput[]
    set?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    disconnect?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    delete?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    connect?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    update?: EspelhoMensalUpdateWithWhereUniqueWithoutRegistrosInput | EspelhoMensalUpdateWithWhereUniqueWithoutRegistrosInput[]
    updateMany?: EspelhoMensalUpdateManyWithWhereWithoutRegistrosInput | EspelhoMensalUpdateManyWithWhereWithoutRegistrosInput[]
    deleteMany?: EspelhoMensalScalarWhereInput | EspelhoMensalScalarWhereInput[]
  }

  export type EspelhoMensalUncheckedUpdateManyWithoutRegistrosNestedInput = {
    create?: XOR<EspelhoMensalCreateWithoutRegistrosInput, EspelhoMensalUncheckedCreateWithoutRegistrosInput> | EspelhoMensalCreateWithoutRegistrosInput[] | EspelhoMensalUncheckedCreateWithoutRegistrosInput[]
    connectOrCreate?: EspelhoMensalCreateOrConnectWithoutRegistrosInput | EspelhoMensalCreateOrConnectWithoutRegistrosInput[]
    upsert?: EspelhoMensalUpsertWithWhereUniqueWithoutRegistrosInput | EspelhoMensalUpsertWithWhereUniqueWithoutRegistrosInput[]
    set?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    disconnect?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    delete?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    connect?: EspelhoMensalWhereUniqueInput | EspelhoMensalWhereUniqueInput[]
    update?: EspelhoMensalUpdateWithWhereUniqueWithoutRegistrosInput | EspelhoMensalUpdateWithWhereUniqueWithoutRegistrosInput[]
    updateMany?: EspelhoMensalUpdateManyWithWhereWithoutRegistrosInput | EspelhoMensalUpdateManyWithWhereWithoutRegistrosInput[]
    deleteMany?: EspelhoMensalScalarWhereInput | EspelhoMensalScalarWhereInput[]
  }

  export type EspelhoDiarioCreateNestedManyWithoutEspelhoMensalInput = {
    create?: XOR<EspelhoDiarioCreateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput> | EspelhoDiarioCreateWithoutEspelhoMensalInput[] | EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput[]
    connectOrCreate?: EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput | EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput[]
    connect?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
  }

  export type EspelhoDiarioUncheckedCreateNestedManyWithoutEspelhoMensalInput = {
    create?: XOR<EspelhoDiarioCreateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput> | EspelhoDiarioCreateWithoutEspelhoMensalInput[] | EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput[]
    connectOrCreate?: EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput | EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput[]
    connect?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EspelhoDiarioUpdateManyWithoutEspelhoMensalNestedInput = {
    create?: XOR<EspelhoDiarioCreateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput> | EspelhoDiarioCreateWithoutEspelhoMensalInput[] | EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput[]
    connectOrCreate?: EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput | EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput[]
    upsert?: EspelhoDiarioUpsertWithWhereUniqueWithoutEspelhoMensalInput | EspelhoDiarioUpsertWithWhereUniqueWithoutEspelhoMensalInput[]
    set?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    disconnect?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    delete?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    connect?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    update?: EspelhoDiarioUpdateWithWhereUniqueWithoutEspelhoMensalInput | EspelhoDiarioUpdateWithWhereUniqueWithoutEspelhoMensalInput[]
    updateMany?: EspelhoDiarioUpdateManyWithWhereWithoutEspelhoMensalInput | EspelhoDiarioUpdateManyWithWhereWithoutEspelhoMensalInput[]
    deleteMany?: EspelhoDiarioScalarWhereInput | EspelhoDiarioScalarWhereInput[]
  }

  export type EspelhoDiarioUncheckedUpdateManyWithoutEspelhoMensalNestedInput = {
    create?: XOR<EspelhoDiarioCreateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput> | EspelhoDiarioCreateWithoutEspelhoMensalInput[] | EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput[]
    connectOrCreate?: EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput | EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput[]
    upsert?: EspelhoDiarioUpsertWithWhereUniqueWithoutEspelhoMensalInput | EspelhoDiarioUpsertWithWhereUniqueWithoutEspelhoMensalInput[]
    set?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    disconnect?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    delete?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    connect?: EspelhoDiarioWhereUniqueInput | EspelhoDiarioWhereUniqueInput[]
    update?: EspelhoDiarioUpdateWithWhereUniqueWithoutEspelhoMensalInput | EspelhoDiarioUpdateWithWhereUniqueWithoutEspelhoMensalInput[]
    updateMany?: EspelhoDiarioUpdateManyWithWhereWithoutEspelhoMensalInput | EspelhoDiarioUpdateManyWithWhereWithoutEspelhoMensalInput[]
    deleteMany?: EspelhoDiarioScalarWhereInput | EspelhoDiarioScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EspelhoMensalCreateWithoutRegistrosInput = {
    cpf: string
    mesAno: string
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos?: number | null
    ajustesEAbonos?: number | null
    faltas?: number | null
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao?: Date | string
  }

  export type EspelhoMensalUncheckedCreateWithoutRegistrosInput = {
    id?: number
    cpf: string
    mesAno: string
    diasUteis: number
    diasTrabalhados: number
    registrosCorretos?: number | null
    ajustesEAbonos?: number | null
    faltas?: number | null
    totalHorasTrabalhadas: number
    totalHorasDevidas: number
    saldoHoras: number
    dataCriacao?: Date | string
  }

  export type EspelhoMensalCreateOrConnectWithoutRegistrosInput = {
    where: EspelhoMensalWhereUniqueInput
    create: XOR<EspelhoMensalCreateWithoutRegistrosInput, EspelhoMensalUncheckedCreateWithoutRegistrosInput>
  }

  export type EspelhoMensalUpsertWithWhereUniqueWithoutRegistrosInput = {
    where: EspelhoMensalWhereUniqueInput
    update: XOR<EspelhoMensalUpdateWithoutRegistrosInput, EspelhoMensalUncheckedUpdateWithoutRegistrosInput>
    create: XOR<EspelhoMensalCreateWithoutRegistrosInput, EspelhoMensalUncheckedCreateWithoutRegistrosInput>
  }

  export type EspelhoMensalUpdateWithWhereUniqueWithoutRegistrosInput = {
    where: EspelhoMensalWhereUniqueInput
    data: XOR<EspelhoMensalUpdateWithoutRegistrosInput, EspelhoMensalUncheckedUpdateWithoutRegistrosInput>
  }

  export type EspelhoMensalUpdateManyWithWhereWithoutRegistrosInput = {
    where: EspelhoMensalScalarWhereInput
    data: XOR<EspelhoMensalUpdateManyMutationInput, EspelhoMensalUncheckedUpdateManyWithoutRegistrosInput>
  }

  export type EspelhoMensalScalarWhereInput = {
    AND?: EspelhoMensalScalarWhereInput | EspelhoMensalScalarWhereInput[]
    OR?: EspelhoMensalScalarWhereInput[]
    NOT?: EspelhoMensalScalarWhereInput | EspelhoMensalScalarWhereInput[]
    id?: IntFilter<"EspelhoMensal"> | number
    cpf?: StringFilter<"EspelhoMensal"> | string
    mesAno?: StringFilter<"EspelhoMensal"> | string
    diasUteis?: IntFilter<"EspelhoMensal"> | number
    diasTrabalhados?: IntFilter<"EspelhoMensal"> | number
    registrosCorretos?: IntNullableFilter<"EspelhoMensal"> | number | null
    ajustesEAbonos?: IntNullableFilter<"EspelhoMensal"> | number | null
    faltas?: IntNullableFilter<"EspelhoMensal"> | number | null
    totalHorasTrabalhadas?: FloatFilter<"EspelhoMensal"> | number
    totalHorasDevidas?: FloatFilter<"EspelhoMensal"> | number
    saldoHoras?: FloatFilter<"EspelhoMensal"> | number
    dataCriacao?: DateTimeFilter<"EspelhoMensal"> | Date | string
  }

  export type EspelhoDiarioCreateWithoutEspelhoMensalInput = {
    cpf: string
    mesAno: string
    diaDoMes: string
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste?: string | null
    data: string
    primeiraEntrada?: string | null
    primeiraSaida?: string | null
    segundaEntrada?: string | null
    segundaSaida?: string | null
    horasTrabalhadas: number
    observacoes: string
    status: string
    origem?: string | null
  }

  export type EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput = {
    id?: number
    cpf: string
    mesAno: string
    diaDoMes: string
    credito: number
    debito: number
    horasNormais: number
    horasExtras: number
    saldo: number
    motivoReajuste?: string | null
    data: string
    primeiraEntrada?: string | null
    primeiraSaida?: string | null
    segundaEntrada?: string | null
    segundaSaida?: string | null
    horasTrabalhadas: number
    observacoes: string
    status: string
    origem?: string | null
  }

  export type EspelhoDiarioCreateOrConnectWithoutEspelhoMensalInput = {
    where: EspelhoDiarioWhereUniqueInput
    create: XOR<EspelhoDiarioCreateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput>
  }

  export type EspelhoDiarioUpsertWithWhereUniqueWithoutEspelhoMensalInput = {
    where: EspelhoDiarioWhereUniqueInput
    update: XOR<EspelhoDiarioUpdateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedUpdateWithoutEspelhoMensalInput>
    create: XOR<EspelhoDiarioCreateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedCreateWithoutEspelhoMensalInput>
  }

  export type EspelhoDiarioUpdateWithWhereUniqueWithoutEspelhoMensalInput = {
    where: EspelhoDiarioWhereUniqueInput
    data: XOR<EspelhoDiarioUpdateWithoutEspelhoMensalInput, EspelhoDiarioUncheckedUpdateWithoutEspelhoMensalInput>
  }

  export type EspelhoDiarioUpdateManyWithWhereWithoutEspelhoMensalInput = {
    where: EspelhoDiarioScalarWhereInput
    data: XOR<EspelhoDiarioUpdateManyMutationInput, EspelhoDiarioUncheckedUpdateManyWithoutEspelhoMensalInput>
  }

  export type EspelhoDiarioScalarWhereInput = {
    AND?: EspelhoDiarioScalarWhereInput | EspelhoDiarioScalarWhereInput[]
    OR?: EspelhoDiarioScalarWhereInput[]
    NOT?: EspelhoDiarioScalarWhereInput | EspelhoDiarioScalarWhereInput[]
    id?: IntFilter<"EspelhoDiario"> | number
    cpf?: StringFilter<"EspelhoDiario"> | string
    mesAno?: StringFilter<"EspelhoDiario"> | string
    diaDoMes?: StringFilter<"EspelhoDiario"> | string
    credito?: FloatFilter<"EspelhoDiario"> | number
    debito?: FloatFilter<"EspelhoDiario"> | number
    horasNormais?: FloatFilter<"EspelhoDiario"> | number
    horasExtras?: FloatFilter<"EspelhoDiario"> | number
    saldo?: FloatFilter<"EspelhoDiario"> | number
    motivoReajuste?: StringNullableFilter<"EspelhoDiario"> | string | null
    data?: StringFilter<"EspelhoDiario"> | string
    primeiraEntrada?: StringNullableFilter<"EspelhoDiario"> | string | null
    primeiraSaida?: StringNullableFilter<"EspelhoDiario"> | string | null
    segundaEntrada?: StringNullableFilter<"EspelhoDiario"> | string | null
    segundaSaida?: StringNullableFilter<"EspelhoDiario"> | string | null
    horasTrabalhadas?: FloatFilter<"EspelhoDiario"> | number
    observacoes?: StringFilter<"EspelhoDiario"> | string
    status?: StringFilter<"EspelhoDiario"> | string
    origem?: StringNullableFilter<"EspelhoDiario"> | string | null
  }

  export type EspelhoMensalUpdateWithoutRegistrosInput = {
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EspelhoMensalUncheckedUpdateWithoutRegistrosInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EspelhoMensalUncheckedUpdateManyWithoutRegistrosInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diasUteis?: IntFieldUpdateOperationsInput | number
    diasTrabalhados?: IntFieldUpdateOperationsInput | number
    registrosCorretos?: NullableIntFieldUpdateOperationsInput | number | null
    ajustesEAbonos?: NullableIntFieldUpdateOperationsInput | number | null
    faltas?: NullableIntFieldUpdateOperationsInput | number | null
    totalHorasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    totalHorasDevidas?: FloatFieldUpdateOperationsInput | number
    saldoHoras?: FloatFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EspelhoDiarioUpdateWithoutEspelhoMensalInput = {
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspelhoDiarioUncheckedUpdateWithoutEspelhoMensalInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspelhoDiarioUncheckedUpdateManyWithoutEspelhoMensalInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: StringFieldUpdateOperationsInput | string
    mesAno?: StringFieldUpdateOperationsInput | string
    diaDoMes?: StringFieldUpdateOperationsInput | string
    credito?: FloatFieldUpdateOperationsInput | number
    debito?: FloatFieldUpdateOperationsInput | number
    horasNormais?: FloatFieldUpdateOperationsInput | number
    horasExtras?: FloatFieldUpdateOperationsInput | number
    saldo?: FloatFieldUpdateOperationsInput | number
    motivoReajuste?: NullableStringFieldUpdateOperationsInput | string | null
    data?: StringFieldUpdateOperationsInput | string
    primeiraEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    primeiraSaida?: NullableStringFieldUpdateOperationsInput | string | null
    segundaEntrada?: NullableStringFieldUpdateOperationsInput | string | null
    segundaSaida?: NullableStringFieldUpdateOperationsInput | string | null
    horasTrabalhadas?: FloatFieldUpdateOperationsInput | number
    observacoes?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    origem?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
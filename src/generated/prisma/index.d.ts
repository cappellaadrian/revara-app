
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model PlanFile
 * 
 */
export type PlanFile = $Result.DefaultSelection<Prisma.$PlanFilePayload>
/**
 * Model Classification
 * 
 */
export type Classification = $Result.DefaultSelection<Prisma.$ClassificationPayload>
/**
 * Model Assembly
 * 
 */
export type Assembly = $Result.DefaultSelection<Prisma.$AssemblyPayload>
/**
 * Model SharedModel
 * 
 */
export type SharedModel = $Result.DefaultSelection<Prisma.$SharedModelPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs>;

  /**
   * `prisma.planFile`: Exposes CRUD operations for the **PlanFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanFiles
    * const planFiles = await prisma.planFile.findMany()
    * ```
    */
  get planFile(): Prisma.PlanFileDelegate<ExtArgs>;

  /**
   * `prisma.classification`: Exposes CRUD operations for the **Classification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classifications
    * const classifications = await prisma.classification.findMany()
    * ```
    */
  get classification(): Prisma.ClassificationDelegate<ExtArgs>;

  /**
   * `prisma.assembly`: Exposes CRUD operations for the **Assembly** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assemblies
    * const assemblies = await prisma.assembly.findMany()
    * ```
    */
  get assembly(): Prisma.AssemblyDelegate<ExtArgs>;

  /**
   * `prisma.sharedModel`: Exposes CRUD operations for the **SharedModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SharedModels
    * const sharedModels = await prisma.sharedModel.findMany()
    * ```
    */
  get sharedModel(): Prisma.SharedModelDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    Project: 'Project',
    PlanFile: 'PlanFile',
    Classification: 'Classification',
    Assembly: 'Assembly',
    SharedModel: 'SharedModel'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "project" | "planFile" | "classification" | "assembly" | "sharedModel"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      PlanFile: {
        payload: Prisma.$PlanFilePayload<ExtArgs>
        fields: Prisma.PlanFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>
          }
          findFirst: {
            args: Prisma.PlanFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>
          }
          findMany: {
            args: Prisma.PlanFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>[]
          }
          create: {
            args: Prisma.PlanFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>
          }
          createMany: {
            args: Prisma.PlanFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>[]
          }
          delete: {
            args: Prisma.PlanFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>
          }
          update: {
            args: Prisma.PlanFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>
          }
          deleteMany: {
            args: Prisma.PlanFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlanFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFilePayload>
          }
          aggregate: {
            args: Prisma.PlanFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanFile>
          }
          groupBy: {
            args: Prisma.PlanFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanFileCountArgs<ExtArgs>
            result: $Utils.Optional<PlanFileCountAggregateOutputType> | number
          }
        }
      }
      Classification: {
        payload: Prisma.$ClassificationPayload<ExtArgs>
        fields: Prisma.ClassificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          findFirst: {
            args: Prisma.ClassificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          findMany: {
            args: Prisma.ClassificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>[]
          }
          create: {
            args: Prisma.ClassificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          createMany: {
            args: Prisma.ClassificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>[]
          }
          delete: {
            args: Prisma.ClassificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          update: {
            args: Prisma.ClassificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          deleteMany: {
            args: Prisma.ClassificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          aggregate: {
            args: Prisma.ClassificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassification>
          }
          groupBy: {
            args: Prisma.ClassificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassificationCountArgs<ExtArgs>
            result: $Utils.Optional<ClassificationCountAggregateOutputType> | number
          }
        }
      }
      Assembly: {
        payload: Prisma.$AssemblyPayload<ExtArgs>
        fields: Prisma.AssemblyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssemblyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssemblyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>
          }
          findFirst: {
            args: Prisma.AssemblyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssemblyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>
          }
          findMany: {
            args: Prisma.AssemblyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>[]
          }
          create: {
            args: Prisma.AssemblyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>
          }
          createMany: {
            args: Prisma.AssemblyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssemblyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>[]
          }
          delete: {
            args: Prisma.AssemblyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>
          }
          update: {
            args: Prisma.AssemblyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>
          }
          deleteMany: {
            args: Prisma.AssemblyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssemblyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssemblyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssemblyPayload>
          }
          aggregate: {
            args: Prisma.AssemblyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssembly>
          }
          groupBy: {
            args: Prisma.AssemblyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssemblyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssemblyCountArgs<ExtArgs>
            result: $Utils.Optional<AssemblyCountAggregateOutputType> | number
          }
        }
      }
      SharedModel: {
        payload: Prisma.$SharedModelPayload<ExtArgs>
        fields: Prisma.SharedModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SharedModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SharedModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>
          }
          findFirst: {
            args: Prisma.SharedModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SharedModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>
          }
          findMany: {
            args: Prisma.SharedModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>[]
          }
          create: {
            args: Prisma.SharedModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>
          }
          createMany: {
            args: Prisma.SharedModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SharedModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>[]
          }
          delete: {
            args: Prisma.SharedModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>
          }
          update: {
            args: Prisma.SharedModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>
          }
          deleteMany: {
            args: Prisma.SharedModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SharedModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SharedModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedModelPayload>
          }
          aggregate: {
            args: Prisma.SharedModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSharedModel>
          }
          groupBy: {
            args: Prisma.SharedModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<SharedModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.SharedModelCountArgs<ExtArgs>
            result: $Utils.Optional<SharedModelCountAggregateOutputType> | number
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
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    planFiles: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planFiles?: boolean | ProjectCountOutputTypeCountPlanFilesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountPlanFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: string | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: string | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    role: number
    company: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    company?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    role: string
    company: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      role: string
      company: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly company: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    grossArea: number | null
    estimatedCost: number | null
  }

  export type ProjectSumAggregateOutputType = {
    grossArea: number | null
    estimatedCost: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    number: string | null
    buildingType: string | null
    grossArea: number | null
    estimatedCost: number | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    number: string | null
    buildingType: string | null
    grossArea: number | null
    estimatedCost: number | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    number: number
    buildingType: number
    grossArea: number
    estimatedCost: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    grossArea?: true
    estimatedCost?: true
  }

  export type ProjectSumAggregateInputType = {
    grossArea?: true
    estimatedCost?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    number?: true
    buildingType?: true
    grossArea?: true
    estimatedCost?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    number?: true
    buildingType?: true
    grossArea?: true
    estimatedCost?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    number?: true
    buildingType?: true
    grossArea?: true
    estimatedCost?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    number: string
    buildingType: string
    grossArea: number
    estimatedCost: number
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    number?: boolean
    buildingType?: boolean
    grossArea?: boolean
    estimatedCost?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    planFiles?: boolean | Project$planFilesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    number?: boolean
    buildingType?: boolean
    grossArea?: boolean
    estimatedCost?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    number?: boolean
    buildingType?: boolean
    grossArea?: boolean
    estimatedCost?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planFiles?: boolean | Project$planFilesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      planFiles: Prisma.$PlanFilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      number: string
      buildingType: string
      grossArea: number
      estimatedCost: number
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
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
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    planFiles<T extends Project$planFilesArgs<ExtArgs> = {}>(args?: Subset<T, Project$planFilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Project model
   */ 
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly number: FieldRef<"Project", 'String'>
    readonly buildingType: FieldRef<"Project", 'String'>
    readonly grossArea: FieldRef<"Project", 'Float'>
    readonly estimatedCost: FieldRef<"Project", 'Float'>
    readonly createdBy: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
  }

  /**
   * Project.planFiles
   */
  export type Project$planFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    where?: PlanFileWhereInput
    orderBy?: PlanFileOrderByWithRelationInput | PlanFileOrderByWithRelationInput[]
    cursor?: PlanFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanFileScalarFieldEnum | PlanFileScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model PlanFile
   */

  export type AggregatePlanFile = {
    _count: PlanFileCountAggregateOutputType | null
    _avg: PlanFileAvgAggregateOutputType | null
    _sum: PlanFileSumAggregateOutputType | null
    _min: PlanFileMinAggregateOutputType | null
    _max: PlanFileMaxAggregateOutputType | null
  }

  export type PlanFileAvgAggregateOutputType = {
    scale: number | null
    sortOrder: number | null
  }

  export type PlanFileSumAggregateOutputType = {
    scale: number | null
    sortOrder: number | null
  }

  export type PlanFileMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    filePath: string | null
    fileType: string | null
    sheetNumber: string | null
    discipline: string | null
    revision: string | null
    setName: string | null
    scale: number | null
    analysis: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type PlanFileMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    filePath: string | null
    fileType: string | null
    sheetNumber: string | null
    discipline: string | null
    revision: string | null
    setName: string | null
    scale: number | null
    analysis: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type PlanFileCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    filePath: number
    fileType: number
    sheetNumber: number
    discipline: number
    revision: number
    setName: number
    scale: number
    analysis: number
    sortOrder: number
    createdAt: number
    _all: number
  }


  export type PlanFileAvgAggregateInputType = {
    scale?: true
    sortOrder?: true
  }

  export type PlanFileSumAggregateInputType = {
    scale?: true
    sortOrder?: true
  }

  export type PlanFileMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    filePath?: true
    fileType?: true
    sheetNumber?: true
    discipline?: true
    revision?: true
    setName?: true
    scale?: true
    analysis?: true
    sortOrder?: true
    createdAt?: true
  }

  export type PlanFileMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    filePath?: true
    fileType?: true
    sheetNumber?: true
    discipline?: true
    revision?: true
    setName?: true
    scale?: true
    analysis?: true
    sortOrder?: true
    createdAt?: true
  }

  export type PlanFileCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    filePath?: true
    fileType?: true
    sheetNumber?: true
    discipline?: true
    revision?: true
    setName?: true
    scale?: true
    analysis?: true
    sortOrder?: true
    createdAt?: true
    _all?: true
  }

  export type PlanFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFile to aggregate.
     */
    where?: PlanFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFiles to fetch.
     */
    orderBy?: PlanFileOrderByWithRelationInput | PlanFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanFiles
    **/
    _count?: true | PlanFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanFileMaxAggregateInputType
  }

  export type GetPlanFileAggregateType<T extends PlanFileAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanFile[P]>
      : GetScalarType<T[P], AggregatePlanFile[P]>
  }




  export type PlanFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFileWhereInput
    orderBy?: PlanFileOrderByWithAggregationInput | PlanFileOrderByWithAggregationInput[]
    by: PlanFileScalarFieldEnum[] | PlanFileScalarFieldEnum
    having?: PlanFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanFileCountAggregateInputType | true
    _avg?: PlanFileAvgAggregateInputType
    _sum?: PlanFileSumAggregateInputType
    _min?: PlanFileMinAggregateInputType
    _max?: PlanFileMaxAggregateInputType
  }

  export type PlanFileGroupByOutputType = {
    id: string
    projectId: string
    name: string
    filePath: string
    fileType: string
    sheetNumber: string
    discipline: string
    revision: string
    setName: string
    scale: number
    analysis: string
    sortOrder: number
    createdAt: Date
    _count: PlanFileCountAggregateOutputType | null
    _avg: PlanFileAvgAggregateOutputType | null
    _sum: PlanFileSumAggregateOutputType | null
    _min: PlanFileMinAggregateOutputType | null
    _max: PlanFileMaxAggregateOutputType | null
  }

  type GetPlanFileGroupByPayload<T extends PlanFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanFileGroupByOutputType[P]>
            : GetScalarType<T[P], PlanFileGroupByOutputType[P]>
        }
      >
    >


  export type PlanFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    filePath?: boolean
    fileType?: boolean
    sheetNumber?: boolean
    discipline?: boolean
    revision?: boolean
    setName?: boolean
    scale?: boolean
    analysis?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFile"]>

  export type PlanFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    filePath?: boolean
    fileType?: boolean
    sheetNumber?: boolean
    discipline?: boolean
    revision?: boolean
    setName?: boolean
    scale?: boolean
    analysis?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFile"]>

  export type PlanFileSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    filePath?: boolean
    fileType?: boolean
    sheetNumber?: boolean
    discipline?: boolean
    revision?: boolean
    setName?: boolean
    scale?: boolean
    analysis?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }

  export type PlanFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type PlanFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $PlanFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanFile"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      filePath: string
      fileType: string
      sheetNumber: string
      discipline: string
      revision: string
      setName: string
      scale: number
      analysis: string
      sortOrder: number
      createdAt: Date
    }, ExtArgs["result"]["planFile"]>
    composites: {}
  }

  type PlanFileGetPayload<S extends boolean | null | undefined | PlanFileDefaultArgs> = $Result.GetResult<Prisma.$PlanFilePayload, S>

  type PlanFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlanFileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlanFileCountAggregateInputType | true
    }

  export interface PlanFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanFile'], meta: { name: 'PlanFile' } }
    /**
     * Find zero or one PlanFile that matches the filter.
     * @param {PlanFileFindUniqueArgs} args - Arguments to find a PlanFile
     * @example
     * // Get one PlanFile
     * const planFile = await prisma.planFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFileFindUniqueArgs>(args: SelectSubset<T, PlanFileFindUniqueArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlanFile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlanFileFindUniqueOrThrowArgs} args - Arguments to find a PlanFile
     * @example
     * // Get one PlanFile
     * const planFile = await prisma.planFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFileFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlanFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileFindFirstArgs} args - Arguments to find a PlanFile
     * @example
     * // Get one PlanFile
     * const planFile = await prisma.planFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFileFindFirstArgs>(args?: SelectSubset<T, PlanFileFindFirstArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlanFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileFindFirstOrThrowArgs} args - Arguments to find a PlanFile
     * @example
     * // Get one PlanFile
     * const planFile = await prisma.planFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFileFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlanFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanFiles
     * const planFiles = await prisma.planFile.findMany()
     * 
     * // Get first 10 PlanFiles
     * const planFiles = await prisma.planFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planFileWithIdOnly = await prisma.planFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFileFindManyArgs>(args?: SelectSubset<T, PlanFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlanFile.
     * @param {PlanFileCreateArgs} args - Arguments to create a PlanFile.
     * @example
     * // Create one PlanFile
     * const PlanFile = await prisma.planFile.create({
     *   data: {
     *     // ... data to create a PlanFile
     *   }
     * })
     * 
     */
    create<T extends PlanFileCreateArgs>(args: SelectSubset<T, PlanFileCreateArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlanFiles.
     * @param {PlanFileCreateManyArgs} args - Arguments to create many PlanFiles.
     * @example
     * // Create many PlanFiles
     * const planFile = await prisma.planFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanFileCreateManyArgs>(args?: SelectSubset<T, PlanFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanFiles and returns the data saved in the database.
     * @param {PlanFileCreateManyAndReturnArgs} args - Arguments to create many PlanFiles.
     * @example
     * // Create many PlanFiles
     * const planFile = await prisma.planFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanFiles and only return the `id`
     * const planFileWithIdOnly = await prisma.planFile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanFileCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlanFile.
     * @param {PlanFileDeleteArgs} args - Arguments to delete one PlanFile.
     * @example
     * // Delete one PlanFile
     * const PlanFile = await prisma.planFile.delete({
     *   where: {
     *     // ... filter to delete one PlanFile
     *   }
     * })
     * 
     */
    delete<T extends PlanFileDeleteArgs>(args: SelectSubset<T, PlanFileDeleteArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlanFile.
     * @param {PlanFileUpdateArgs} args - Arguments to update one PlanFile.
     * @example
     * // Update one PlanFile
     * const planFile = await prisma.planFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanFileUpdateArgs>(args: SelectSubset<T, PlanFileUpdateArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlanFiles.
     * @param {PlanFileDeleteManyArgs} args - Arguments to filter PlanFiles to delete.
     * @example
     * // Delete a few PlanFiles
     * const { count } = await prisma.planFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanFileDeleteManyArgs>(args?: SelectSubset<T, PlanFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanFiles
     * const planFile = await prisma.planFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanFileUpdateManyArgs>(args: SelectSubset<T, PlanFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlanFile.
     * @param {PlanFileUpsertArgs} args - Arguments to update or create a PlanFile.
     * @example
     * // Update or create a PlanFile
     * const planFile = await prisma.planFile.upsert({
     *   create: {
     *     // ... data to create a PlanFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanFile we want to update
     *   }
     * })
     */
    upsert<T extends PlanFileUpsertArgs>(args: SelectSubset<T, PlanFileUpsertArgs<ExtArgs>>): Prisma__PlanFileClient<$Result.GetResult<Prisma.$PlanFilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlanFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileCountArgs} args - Arguments to filter PlanFiles to count.
     * @example
     * // Count the number of PlanFiles
     * const count = await prisma.planFile.count({
     *   where: {
     *     // ... the filter for the PlanFiles we want to count
     *   }
     * })
    **/
    count<T extends PlanFileCountArgs>(
      args?: Subset<T, PlanFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlanFileAggregateArgs>(args: Subset<T, PlanFileAggregateArgs>): Prisma.PrismaPromise<GetPlanFileAggregateType<T>>

    /**
     * Group by PlanFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFileGroupByArgs} args - Group by arguments.
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
      T extends PlanFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanFileGroupByArgs['orderBy'] }
        : { orderBy?: PlanFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlanFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanFile model
   */
  readonly fields: PlanFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PlanFile model
   */ 
  interface PlanFileFieldRefs {
    readonly id: FieldRef<"PlanFile", 'String'>
    readonly projectId: FieldRef<"PlanFile", 'String'>
    readonly name: FieldRef<"PlanFile", 'String'>
    readonly filePath: FieldRef<"PlanFile", 'String'>
    readonly fileType: FieldRef<"PlanFile", 'String'>
    readonly sheetNumber: FieldRef<"PlanFile", 'String'>
    readonly discipline: FieldRef<"PlanFile", 'String'>
    readonly revision: FieldRef<"PlanFile", 'String'>
    readonly setName: FieldRef<"PlanFile", 'String'>
    readonly scale: FieldRef<"PlanFile", 'Float'>
    readonly analysis: FieldRef<"PlanFile", 'String'>
    readonly sortOrder: FieldRef<"PlanFile", 'Int'>
    readonly createdAt: FieldRef<"PlanFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanFile findUnique
   */
  export type PlanFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * Filter, which PlanFile to fetch.
     */
    where: PlanFileWhereUniqueInput
  }

  /**
   * PlanFile findUniqueOrThrow
   */
  export type PlanFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * Filter, which PlanFile to fetch.
     */
    where: PlanFileWhereUniqueInput
  }

  /**
   * PlanFile findFirst
   */
  export type PlanFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * Filter, which PlanFile to fetch.
     */
    where?: PlanFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFiles to fetch.
     */
    orderBy?: PlanFileOrderByWithRelationInput | PlanFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFiles.
     */
    cursor?: PlanFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFiles.
     */
    distinct?: PlanFileScalarFieldEnum | PlanFileScalarFieldEnum[]
  }

  /**
   * PlanFile findFirstOrThrow
   */
  export type PlanFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * Filter, which PlanFile to fetch.
     */
    where?: PlanFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFiles to fetch.
     */
    orderBy?: PlanFileOrderByWithRelationInput | PlanFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFiles.
     */
    cursor?: PlanFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFiles.
     */
    distinct?: PlanFileScalarFieldEnum | PlanFileScalarFieldEnum[]
  }

  /**
   * PlanFile findMany
   */
  export type PlanFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * Filter, which PlanFiles to fetch.
     */
    where?: PlanFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFiles to fetch.
     */
    orderBy?: PlanFileOrderByWithRelationInput | PlanFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanFiles.
     */
    cursor?: PlanFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFiles.
     */
    skip?: number
    distinct?: PlanFileScalarFieldEnum | PlanFileScalarFieldEnum[]
  }

  /**
   * PlanFile create
   */
  export type PlanFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanFile.
     */
    data: XOR<PlanFileCreateInput, PlanFileUncheckedCreateInput>
  }

  /**
   * PlanFile createMany
   */
  export type PlanFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanFiles.
     */
    data: PlanFileCreateManyInput | PlanFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlanFile createManyAndReturn
   */
  export type PlanFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlanFiles.
     */
    data: PlanFileCreateManyInput | PlanFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanFile update
   */
  export type PlanFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanFile.
     */
    data: XOR<PlanFileUpdateInput, PlanFileUncheckedUpdateInput>
    /**
     * Choose, which PlanFile to update.
     */
    where: PlanFileWhereUniqueInput
  }

  /**
   * PlanFile updateMany
   */
  export type PlanFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanFiles.
     */
    data: XOR<PlanFileUpdateManyMutationInput, PlanFileUncheckedUpdateManyInput>
    /**
     * Filter which PlanFiles to update
     */
    where?: PlanFileWhereInput
  }

  /**
   * PlanFile upsert
   */
  export type PlanFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanFile to update in case it exists.
     */
    where: PlanFileWhereUniqueInput
    /**
     * In case the PlanFile found by the `where` argument doesn't exist, create a new PlanFile with this data.
     */
    create: XOR<PlanFileCreateInput, PlanFileUncheckedCreateInput>
    /**
     * In case the PlanFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanFileUpdateInput, PlanFileUncheckedUpdateInput>
  }

  /**
   * PlanFile delete
   */
  export type PlanFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
    /**
     * Filter which PlanFile to delete.
     */
    where: PlanFileWhereUniqueInput
  }

  /**
   * PlanFile deleteMany
   */
  export type PlanFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFiles to delete
     */
    where?: PlanFileWhereInput
  }

  /**
   * PlanFile without action
   */
  export type PlanFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFile
     */
    select?: PlanFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFileInclude<ExtArgs> | null
  }


  /**
   * Model Classification
   */

  export type AggregateClassification = {
    _count: ClassificationCountAggregateOutputType | null
    _avg: ClassificationAvgAggregateOutputType | null
    _sum: ClassificationSumAggregateOutputType | null
    _min: ClassificationMinAggregateOutputType | null
    _max: ClassificationMaxAggregateOutputType | null
  }

  export type ClassificationAvgAggregateOutputType = {
    unitRate: number | null
  }

  export type ClassificationSumAggregateOutputType = {
    unitRate: number | null
  }

  export type ClassificationMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    color: string | null
    costCode: string | null
    unitRate: number | null
    unit: string | null
    companyWide: boolean | null
    projectId: string | null
    createdAt: Date | null
  }

  export type ClassificationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    color: string | null
    costCode: string | null
    unitRate: number | null
    unit: string | null
    companyWide: boolean | null
    projectId: string | null
    createdAt: Date | null
  }

  export type ClassificationCountAggregateOutputType = {
    id: number
    name: number
    category: number
    color: number
    costCode: number
    unitRate: number
    unit: number
    companyWide: number
    projectId: number
    createdAt: number
    _all: number
  }


  export type ClassificationAvgAggregateInputType = {
    unitRate?: true
  }

  export type ClassificationSumAggregateInputType = {
    unitRate?: true
  }

  export type ClassificationMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    color?: true
    costCode?: true
    unitRate?: true
    unit?: true
    companyWide?: true
    projectId?: true
    createdAt?: true
  }

  export type ClassificationMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    color?: true
    costCode?: true
    unitRate?: true
    unit?: true
    companyWide?: true
    projectId?: true
    createdAt?: true
  }

  export type ClassificationCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    color?: true
    costCode?: true
    unitRate?: true
    unit?: true
    companyWide?: true
    projectId?: true
    createdAt?: true
    _all?: true
  }

  export type ClassificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classification to aggregate.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classifications
    **/
    _count?: true | ClassificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassificationMaxAggregateInputType
  }

  export type GetClassificationAggregateType<T extends ClassificationAggregateArgs> = {
        [P in keyof T & keyof AggregateClassification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassification[P]>
      : GetScalarType<T[P], AggregateClassification[P]>
  }




  export type ClassificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassificationWhereInput
    orderBy?: ClassificationOrderByWithAggregationInput | ClassificationOrderByWithAggregationInput[]
    by: ClassificationScalarFieldEnum[] | ClassificationScalarFieldEnum
    having?: ClassificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassificationCountAggregateInputType | true
    _avg?: ClassificationAvgAggregateInputType
    _sum?: ClassificationSumAggregateInputType
    _min?: ClassificationMinAggregateInputType
    _max?: ClassificationMaxAggregateInputType
  }

  export type ClassificationGroupByOutputType = {
    id: string
    name: string
    category: string
    color: string
    costCode: string
    unitRate: number
    unit: string
    companyWide: boolean
    projectId: string
    createdAt: Date
    _count: ClassificationCountAggregateOutputType | null
    _avg: ClassificationAvgAggregateOutputType | null
    _sum: ClassificationSumAggregateOutputType | null
    _min: ClassificationMinAggregateOutputType | null
    _max: ClassificationMaxAggregateOutputType | null
  }

  type GetClassificationGroupByPayload<T extends ClassificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassificationGroupByOutputType[P]>
            : GetScalarType<T[P], ClassificationGroupByOutputType[P]>
        }
      >
    >


  export type ClassificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    color?: boolean
    costCode?: boolean
    unitRate?: boolean
    unit?: boolean
    companyWide?: boolean
    projectId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["classification"]>

  export type ClassificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    color?: boolean
    costCode?: boolean
    unitRate?: boolean
    unit?: boolean
    companyWide?: boolean
    projectId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["classification"]>

  export type ClassificationSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    color?: boolean
    costCode?: boolean
    unitRate?: boolean
    unit?: boolean
    companyWide?: boolean
    projectId?: boolean
    createdAt?: boolean
  }


  export type $ClassificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      color: string
      costCode: string
      unitRate: number
      unit: string
      companyWide: boolean
      projectId: string
      createdAt: Date
    }, ExtArgs["result"]["classification"]>
    composites: {}
  }

  type ClassificationGetPayload<S extends boolean | null | undefined | ClassificationDefaultArgs> = $Result.GetResult<Prisma.$ClassificationPayload, S>

  type ClassificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassificationCountAggregateInputType | true
    }

  export interface ClassificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classification'], meta: { name: 'Classification' } }
    /**
     * Find zero or one Classification that matches the filter.
     * @param {ClassificationFindUniqueArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassificationFindUniqueArgs>(args: SelectSubset<T, ClassificationFindUniqueArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Classification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassificationFindUniqueOrThrowArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassificationFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Classification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationFindFirstArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassificationFindFirstArgs>(args?: SelectSubset<T, ClassificationFindFirstArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Classification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationFindFirstOrThrowArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassificationFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Classifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classifications
     * const classifications = await prisma.classification.findMany()
     * 
     * // Get first 10 Classifications
     * const classifications = await prisma.classification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classificationWithIdOnly = await prisma.classification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassificationFindManyArgs>(args?: SelectSubset<T, ClassificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Classification.
     * @param {ClassificationCreateArgs} args - Arguments to create a Classification.
     * @example
     * // Create one Classification
     * const Classification = await prisma.classification.create({
     *   data: {
     *     // ... data to create a Classification
     *   }
     * })
     * 
     */
    create<T extends ClassificationCreateArgs>(args: SelectSubset<T, ClassificationCreateArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Classifications.
     * @param {ClassificationCreateManyArgs} args - Arguments to create many Classifications.
     * @example
     * // Create many Classifications
     * const classification = await prisma.classification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassificationCreateManyArgs>(args?: SelectSubset<T, ClassificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classifications and returns the data saved in the database.
     * @param {ClassificationCreateManyAndReturnArgs} args - Arguments to create many Classifications.
     * @example
     * // Create many Classifications
     * const classification = await prisma.classification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classifications and only return the `id`
     * const classificationWithIdOnly = await prisma.classification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassificationCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Classification.
     * @param {ClassificationDeleteArgs} args - Arguments to delete one Classification.
     * @example
     * // Delete one Classification
     * const Classification = await prisma.classification.delete({
     *   where: {
     *     // ... filter to delete one Classification
     *   }
     * })
     * 
     */
    delete<T extends ClassificationDeleteArgs>(args: SelectSubset<T, ClassificationDeleteArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Classification.
     * @param {ClassificationUpdateArgs} args - Arguments to update one Classification.
     * @example
     * // Update one Classification
     * const classification = await prisma.classification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassificationUpdateArgs>(args: SelectSubset<T, ClassificationUpdateArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Classifications.
     * @param {ClassificationDeleteManyArgs} args - Arguments to filter Classifications to delete.
     * @example
     * // Delete a few Classifications
     * const { count } = await prisma.classification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassificationDeleteManyArgs>(args?: SelectSubset<T, ClassificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classifications
     * const classification = await prisma.classification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassificationUpdateManyArgs>(args: SelectSubset<T, ClassificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Classification.
     * @param {ClassificationUpsertArgs} args - Arguments to update or create a Classification.
     * @example
     * // Update or create a Classification
     * const classification = await prisma.classification.upsert({
     *   create: {
     *     // ... data to create a Classification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classification we want to update
     *   }
     * })
     */
    upsert<T extends ClassificationUpsertArgs>(args: SelectSubset<T, ClassificationUpsertArgs<ExtArgs>>): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Classifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationCountArgs} args - Arguments to filter Classifications to count.
     * @example
     * // Count the number of Classifications
     * const count = await prisma.classification.count({
     *   where: {
     *     // ... the filter for the Classifications we want to count
     *   }
     * })
    **/
    count<T extends ClassificationCountArgs>(
      args?: Subset<T, ClassificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClassificationAggregateArgs>(args: Subset<T, ClassificationAggregateArgs>): Prisma.PrismaPromise<GetClassificationAggregateType<T>>

    /**
     * Group by Classification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationGroupByArgs} args - Group by arguments.
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
      T extends ClassificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassificationGroupByArgs['orderBy'] }
        : { orderBy?: ClassificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClassificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classification model
   */
  readonly fields: ClassificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Classification model
   */ 
  interface ClassificationFieldRefs {
    readonly id: FieldRef<"Classification", 'String'>
    readonly name: FieldRef<"Classification", 'String'>
    readonly category: FieldRef<"Classification", 'String'>
    readonly color: FieldRef<"Classification", 'String'>
    readonly costCode: FieldRef<"Classification", 'String'>
    readonly unitRate: FieldRef<"Classification", 'Float'>
    readonly unit: FieldRef<"Classification", 'String'>
    readonly companyWide: FieldRef<"Classification", 'Boolean'>
    readonly projectId: FieldRef<"Classification", 'String'>
    readonly createdAt: FieldRef<"Classification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Classification findUnique
   */
  export type ClassificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where: ClassificationWhereUniqueInput
  }

  /**
   * Classification findUniqueOrThrow
   */
  export type ClassificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where: ClassificationWhereUniqueInput
  }

  /**
   * Classification findFirst
   */
  export type ClassificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classifications.
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classifications.
     */
    distinct?: ClassificationScalarFieldEnum | ClassificationScalarFieldEnum[]
  }

  /**
   * Classification findFirstOrThrow
   */
  export type ClassificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classifications.
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classifications.
     */
    distinct?: ClassificationScalarFieldEnum | ClassificationScalarFieldEnum[]
  }

  /**
   * Classification findMany
   */
  export type ClassificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classifications to fetch.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classifications.
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    distinct?: ClassificationScalarFieldEnum | ClassificationScalarFieldEnum[]
  }

  /**
   * Classification create
   */
  export type ClassificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Classification.
     */
    data: XOR<ClassificationCreateInput, ClassificationUncheckedCreateInput>
  }

  /**
   * Classification createMany
   */
  export type ClassificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classifications.
     */
    data: ClassificationCreateManyInput | ClassificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classification createManyAndReturn
   */
  export type ClassificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Classifications.
     */
    data: ClassificationCreateManyInput | ClassificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classification update
   */
  export type ClassificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Classification.
     */
    data: XOR<ClassificationUpdateInput, ClassificationUncheckedUpdateInput>
    /**
     * Choose, which Classification to update.
     */
    where: ClassificationWhereUniqueInput
  }

  /**
   * Classification updateMany
   */
  export type ClassificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classifications.
     */
    data: XOR<ClassificationUpdateManyMutationInput, ClassificationUncheckedUpdateManyInput>
    /**
     * Filter which Classifications to update
     */
    where?: ClassificationWhereInput
  }

  /**
   * Classification upsert
   */
  export type ClassificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Classification to update in case it exists.
     */
    where: ClassificationWhereUniqueInput
    /**
     * In case the Classification found by the `where` argument doesn't exist, create a new Classification with this data.
     */
    create: XOR<ClassificationCreateInput, ClassificationUncheckedCreateInput>
    /**
     * In case the Classification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassificationUpdateInput, ClassificationUncheckedUpdateInput>
  }

  /**
   * Classification delete
   */
  export type ClassificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter which Classification to delete.
     */
    where: ClassificationWhereUniqueInput
  }

  /**
   * Classification deleteMany
   */
  export type ClassificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classifications to delete
     */
    where?: ClassificationWhereInput
  }

  /**
   * Classification without action
   */
  export type ClassificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
  }


  /**
   * Model Assembly
   */

  export type AggregateAssembly = {
    _count: AssemblyCountAggregateOutputType | null
    _avg: AssemblyAvgAggregateOutputType | null
    _sum: AssemblySumAggregateOutputType | null
    _min: AssemblyMinAggregateOutputType | null
    _max: AssemblyMaxAggregateOutputType | null
  }

  export type AssemblyAvgAggregateOutputType = {
    totalCost: number | null
  }

  export type AssemblySumAggregateOutputType = {
    totalCost: number | null
  }

  export type AssemblyMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    unit: string | null
    description: string | null
    components: string | null
    totalCost: number | null
    companyWide: boolean | null
    projectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssemblyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    unit: string | null
    description: string | null
    components: string | null
    totalCost: number | null
    companyWide: boolean | null
    projectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssemblyCountAggregateOutputType = {
    id: number
    name: number
    category: number
    unit: number
    description: number
    components: number
    totalCost: number
    companyWide: number
    projectId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssemblyAvgAggregateInputType = {
    totalCost?: true
  }

  export type AssemblySumAggregateInputType = {
    totalCost?: true
  }

  export type AssemblyMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    unit?: true
    description?: true
    components?: true
    totalCost?: true
    companyWide?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssemblyMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    unit?: true
    description?: true
    components?: true
    totalCost?: true
    companyWide?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssemblyCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    unit?: true
    description?: true
    components?: true
    totalCost?: true
    companyWide?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssemblyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assembly to aggregate.
     */
    where?: AssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assemblies to fetch.
     */
    orderBy?: AssemblyOrderByWithRelationInput | AssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assemblies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assemblies
    **/
    _count?: true | AssemblyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssemblyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssemblySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssemblyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssemblyMaxAggregateInputType
  }

  export type GetAssemblyAggregateType<T extends AssemblyAggregateArgs> = {
        [P in keyof T & keyof AggregateAssembly]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssembly[P]>
      : GetScalarType<T[P], AggregateAssembly[P]>
  }




  export type AssemblyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssemblyWhereInput
    orderBy?: AssemblyOrderByWithAggregationInput | AssemblyOrderByWithAggregationInput[]
    by: AssemblyScalarFieldEnum[] | AssemblyScalarFieldEnum
    having?: AssemblyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssemblyCountAggregateInputType | true
    _avg?: AssemblyAvgAggregateInputType
    _sum?: AssemblySumAggregateInputType
    _min?: AssemblyMinAggregateInputType
    _max?: AssemblyMaxAggregateInputType
  }

  export type AssemblyGroupByOutputType = {
    id: string
    name: string
    category: string
    unit: string
    description: string
    components: string
    totalCost: number
    companyWide: boolean
    projectId: string
    createdAt: Date
    updatedAt: Date
    _count: AssemblyCountAggregateOutputType | null
    _avg: AssemblyAvgAggregateOutputType | null
    _sum: AssemblySumAggregateOutputType | null
    _min: AssemblyMinAggregateOutputType | null
    _max: AssemblyMaxAggregateOutputType | null
  }

  type GetAssemblyGroupByPayload<T extends AssemblyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssemblyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssemblyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssemblyGroupByOutputType[P]>
            : GetScalarType<T[P], AssemblyGroupByOutputType[P]>
        }
      >
    >


  export type AssemblySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    unit?: boolean
    description?: boolean
    components?: boolean
    totalCost?: boolean
    companyWide?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assembly"]>

  export type AssemblySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    unit?: boolean
    description?: boolean
    components?: boolean
    totalCost?: boolean
    companyWide?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assembly"]>

  export type AssemblySelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    unit?: boolean
    description?: boolean
    components?: boolean
    totalCost?: boolean
    companyWide?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AssemblyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assembly"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      unit: string
      description: string
      components: string
      totalCost: number
      companyWide: boolean
      projectId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assembly"]>
    composites: {}
  }

  type AssemblyGetPayload<S extends boolean | null | undefined | AssemblyDefaultArgs> = $Result.GetResult<Prisma.$AssemblyPayload, S>

  type AssemblyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AssemblyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssemblyCountAggregateInputType | true
    }

  export interface AssemblyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assembly'], meta: { name: 'Assembly' } }
    /**
     * Find zero or one Assembly that matches the filter.
     * @param {AssemblyFindUniqueArgs} args - Arguments to find a Assembly
     * @example
     * // Get one Assembly
     * const assembly = await prisma.assembly.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssemblyFindUniqueArgs>(args: SelectSubset<T, AssemblyFindUniqueArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Assembly that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AssemblyFindUniqueOrThrowArgs} args - Arguments to find a Assembly
     * @example
     * // Get one Assembly
     * const assembly = await prisma.assembly.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssemblyFindUniqueOrThrowArgs>(args: SelectSubset<T, AssemblyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Assembly that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyFindFirstArgs} args - Arguments to find a Assembly
     * @example
     * // Get one Assembly
     * const assembly = await prisma.assembly.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssemblyFindFirstArgs>(args?: SelectSubset<T, AssemblyFindFirstArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Assembly that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyFindFirstOrThrowArgs} args - Arguments to find a Assembly
     * @example
     * // Get one Assembly
     * const assembly = await prisma.assembly.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssemblyFindFirstOrThrowArgs>(args?: SelectSubset<T, AssemblyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Assemblies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assemblies
     * const assemblies = await prisma.assembly.findMany()
     * 
     * // Get first 10 Assemblies
     * const assemblies = await prisma.assembly.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assemblyWithIdOnly = await prisma.assembly.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssemblyFindManyArgs>(args?: SelectSubset<T, AssemblyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Assembly.
     * @param {AssemblyCreateArgs} args - Arguments to create a Assembly.
     * @example
     * // Create one Assembly
     * const Assembly = await prisma.assembly.create({
     *   data: {
     *     // ... data to create a Assembly
     *   }
     * })
     * 
     */
    create<T extends AssemblyCreateArgs>(args: SelectSubset<T, AssemblyCreateArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Assemblies.
     * @param {AssemblyCreateManyArgs} args - Arguments to create many Assemblies.
     * @example
     * // Create many Assemblies
     * const assembly = await prisma.assembly.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssemblyCreateManyArgs>(args?: SelectSubset<T, AssemblyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assemblies and returns the data saved in the database.
     * @param {AssemblyCreateManyAndReturnArgs} args - Arguments to create many Assemblies.
     * @example
     * // Create many Assemblies
     * const assembly = await prisma.assembly.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assemblies and only return the `id`
     * const assemblyWithIdOnly = await prisma.assembly.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssemblyCreateManyAndReturnArgs>(args?: SelectSubset<T, AssemblyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Assembly.
     * @param {AssemblyDeleteArgs} args - Arguments to delete one Assembly.
     * @example
     * // Delete one Assembly
     * const Assembly = await prisma.assembly.delete({
     *   where: {
     *     // ... filter to delete one Assembly
     *   }
     * })
     * 
     */
    delete<T extends AssemblyDeleteArgs>(args: SelectSubset<T, AssemblyDeleteArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Assembly.
     * @param {AssemblyUpdateArgs} args - Arguments to update one Assembly.
     * @example
     * // Update one Assembly
     * const assembly = await prisma.assembly.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssemblyUpdateArgs>(args: SelectSubset<T, AssemblyUpdateArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Assemblies.
     * @param {AssemblyDeleteManyArgs} args - Arguments to filter Assemblies to delete.
     * @example
     * // Delete a few Assemblies
     * const { count } = await prisma.assembly.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssemblyDeleteManyArgs>(args?: SelectSubset<T, AssemblyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assemblies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assemblies
     * const assembly = await prisma.assembly.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssemblyUpdateManyArgs>(args: SelectSubset<T, AssemblyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assembly.
     * @param {AssemblyUpsertArgs} args - Arguments to update or create a Assembly.
     * @example
     * // Update or create a Assembly
     * const assembly = await prisma.assembly.upsert({
     *   create: {
     *     // ... data to create a Assembly
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assembly we want to update
     *   }
     * })
     */
    upsert<T extends AssemblyUpsertArgs>(args: SelectSubset<T, AssemblyUpsertArgs<ExtArgs>>): Prisma__AssemblyClient<$Result.GetResult<Prisma.$AssemblyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Assemblies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyCountArgs} args - Arguments to filter Assemblies to count.
     * @example
     * // Count the number of Assemblies
     * const count = await prisma.assembly.count({
     *   where: {
     *     // ... the filter for the Assemblies we want to count
     *   }
     * })
    **/
    count<T extends AssemblyCountArgs>(
      args?: Subset<T, AssemblyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssemblyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assembly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssemblyAggregateArgs>(args: Subset<T, AssemblyAggregateArgs>): Prisma.PrismaPromise<GetAssemblyAggregateType<T>>

    /**
     * Group by Assembly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssemblyGroupByArgs} args - Group by arguments.
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
      T extends AssemblyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssemblyGroupByArgs['orderBy'] }
        : { orderBy?: AssemblyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssemblyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssemblyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assembly model
   */
  readonly fields: AssemblyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assembly.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssemblyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Assembly model
   */ 
  interface AssemblyFieldRefs {
    readonly id: FieldRef<"Assembly", 'String'>
    readonly name: FieldRef<"Assembly", 'String'>
    readonly category: FieldRef<"Assembly", 'String'>
    readonly unit: FieldRef<"Assembly", 'String'>
    readonly description: FieldRef<"Assembly", 'String'>
    readonly components: FieldRef<"Assembly", 'String'>
    readonly totalCost: FieldRef<"Assembly", 'Float'>
    readonly companyWide: FieldRef<"Assembly", 'Boolean'>
    readonly projectId: FieldRef<"Assembly", 'String'>
    readonly createdAt: FieldRef<"Assembly", 'DateTime'>
    readonly updatedAt: FieldRef<"Assembly", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assembly findUnique
   */
  export type AssemblyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * Filter, which Assembly to fetch.
     */
    where: AssemblyWhereUniqueInput
  }

  /**
   * Assembly findUniqueOrThrow
   */
  export type AssemblyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * Filter, which Assembly to fetch.
     */
    where: AssemblyWhereUniqueInput
  }

  /**
   * Assembly findFirst
   */
  export type AssemblyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * Filter, which Assembly to fetch.
     */
    where?: AssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assemblies to fetch.
     */
    orderBy?: AssemblyOrderByWithRelationInput | AssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assemblies.
     */
    cursor?: AssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assemblies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assemblies.
     */
    distinct?: AssemblyScalarFieldEnum | AssemblyScalarFieldEnum[]
  }

  /**
   * Assembly findFirstOrThrow
   */
  export type AssemblyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * Filter, which Assembly to fetch.
     */
    where?: AssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assemblies to fetch.
     */
    orderBy?: AssemblyOrderByWithRelationInput | AssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assemblies.
     */
    cursor?: AssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assemblies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assemblies.
     */
    distinct?: AssemblyScalarFieldEnum | AssemblyScalarFieldEnum[]
  }

  /**
   * Assembly findMany
   */
  export type AssemblyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * Filter, which Assemblies to fetch.
     */
    where?: AssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assemblies to fetch.
     */
    orderBy?: AssemblyOrderByWithRelationInput | AssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assemblies.
     */
    cursor?: AssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assemblies.
     */
    skip?: number
    distinct?: AssemblyScalarFieldEnum | AssemblyScalarFieldEnum[]
  }

  /**
   * Assembly create
   */
  export type AssemblyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * The data needed to create a Assembly.
     */
    data: XOR<AssemblyCreateInput, AssemblyUncheckedCreateInput>
  }

  /**
   * Assembly createMany
   */
  export type AssemblyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assemblies.
     */
    data: AssemblyCreateManyInput | AssemblyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assembly createManyAndReturn
   */
  export type AssemblyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Assemblies.
     */
    data: AssemblyCreateManyInput | AssemblyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assembly update
   */
  export type AssemblyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * The data needed to update a Assembly.
     */
    data: XOR<AssemblyUpdateInput, AssemblyUncheckedUpdateInput>
    /**
     * Choose, which Assembly to update.
     */
    where: AssemblyWhereUniqueInput
  }

  /**
   * Assembly updateMany
   */
  export type AssemblyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assemblies.
     */
    data: XOR<AssemblyUpdateManyMutationInput, AssemblyUncheckedUpdateManyInput>
    /**
     * Filter which Assemblies to update
     */
    where?: AssemblyWhereInput
  }

  /**
   * Assembly upsert
   */
  export type AssemblyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * The filter to search for the Assembly to update in case it exists.
     */
    where: AssemblyWhereUniqueInput
    /**
     * In case the Assembly found by the `where` argument doesn't exist, create a new Assembly with this data.
     */
    create: XOR<AssemblyCreateInput, AssemblyUncheckedCreateInput>
    /**
     * In case the Assembly was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssemblyUpdateInput, AssemblyUncheckedUpdateInput>
  }

  /**
   * Assembly delete
   */
  export type AssemblyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
    /**
     * Filter which Assembly to delete.
     */
    where: AssemblyWhereUniqueInput
  }

  /**
   * Assembly deleteMany
   */
  export type AssemblyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assemblies to delete
     */
    where?: AssemblyWhereInput
  }

  /**
   * Assembly without action
   */
  export type AssemblyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assembly
     */
    select?: AssemblySelect<ExtArgs> | null
  }


  /**
   * Model SharedModel
   */

  export type AggregateSharedModel = {
    _count: SharedModelCountAggregateOutputType | null
    _avg: SharedModelAvgAggregateOutputType | null
    _sum: SharedModelSumAggregateOutputType | null
    _min: SharedModelMinAggregateOutputType | null
    _max: SharedModelMaxAggregateOutputType | null
  }

  export type SharedModelAvgAggregateOutputType = {
    viewCount: number | null
  }

  export type SharedModelSumAggregateOutputType = {
    viewCount: number | null
  }

  export type SharedModelMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    filePath: string | null
    shareToken: string | null
    viewCount: number | null
    createdBy: string | null
    isPublic: boolean | null
    createdAt: Date | null
  }

  export type SharedModelMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    filePath: string | null
    shareToken: string | null
    viewCount: number | null
    createdBy: string | null
    isPublic: boolean | null
    createdAt: Date | null
  }

  export type SharedModelCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    filePath: number
    shareToken: number
    viewCount: number
    createdBy: number
    isPublic: number
    createdAt: number
    _all: number
  }


  export type SharedModelAvgAggregateInputType = {
    viewCount?: true
  }

  export type SharedModelSumAggregateInputType = {
    viewCount?: true
  }

  export type SharedModelMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    filePath?: true
    shareToken?: true
    viewCount?: true
    createdBy?: true
    isPublic?: true
    createdAt?: true
  }

  export type SharedModelMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    filePath?: true
    shareToken?: true
    viewCount?: true
    createdBy?: true
    isPublic?: true
    createdAt?: true
  }

  export type SharedModelCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    filePath?: true
    shareToken?: true
    viewCount?: true
    createdBy?: true
    isPublic?: true
    createdAt?: true
    _all?: true
  }

  export type SharedModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SharedModel to aggregate.
     */
    where?: SharedModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedModels to fetch.
     */
    orderBy?: SharedModelOrderByWithRelationInput | SharedModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SharedModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SharedModels
    **/
    _count?: true | SharedModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SharedModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SharedModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SharedModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SharedModelMaxAggregateInputType
  }

  export type GetSharedModelAggregateType<T extends SharedModelAggregateArgs> = {
        [P in keyof T & keyof AggregateSharedModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSharedModel[P]>
      : GetScalarType<T[P], AggregateSharedModel[P]>
  }




  export type SharedModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SharedModelWhereInput
    orderBy?: SharedModelOrderByWithAggregationInput | SharedModelOrderByWithAggregationInput[]
    by: SharedModelScalarFieldEnum[] | SharedModelScalarFieldEnum
    having?: SharedModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SharedModelCountAggregateInputType | true
    _avg?: SharedModelAvgAggregateInputType
    _sum?: SharedModelSumAggregateInputType
    _min?: SharedModelMinAggregateInputType
    _max?: SharedModelMaxAggregateInputType
  }

  export type SharedModelGroupByOutputType = {
    id: string
    projectId: string
    name: string
    filePath: string
    shareToken: string
    viewCount: number
    createdBy: string
    isPublic: boolean
    createdAt: Date
    _count: SharedModelCountAggregateOutputType | null
    _avg: SharedModelAvgAggregateOutputType | null
    _sum: SharedModelSumAggregateOutputType | null
    _min: SharedModelMinAggregateOutputType | null
    _max: SharedModelMaxAggregateOutputType | null
  }

  type GetSharedModelGroupByPayload<T extends SharedModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SharedModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SharedModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SharedModelGroupByOutputType[P]>
            : GetScalarType<T[P], SharedModelGroupByOutputType[P]>
        }
      >
    >


  export type SharedModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    filePath?: boolean
    shareToken?: boolean
    viewCount?: boolean
    createdBy?: boolean
    isPublic?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sharedModel"]>

  export type SharedModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    filePath?: boolean
    shareToken?: boolean
    viewCount?: boolean
    createdBy?: boolean
    isPublic?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sharedModel"]>

  export type SharedModelSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    filePath?: boolean
    shareToken?: boolean
    viewCount?: boolean
    createdBy?: boolean
    isPublic?: boolean
    createdAt?: boolean
  }


  export type $SharedModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SharedModel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      filePath: string
      shareToken: string
      viewCount: number
      createdBy: string
      isPublic: boolean
      createdAt: Date
    }, ExtArgs["result"]["sharedModel"]>
    composites: {}
  }

  type SharedModelGetPayload<S extends boolean | null | undefined | SharedModelDefaultArgs> = $Result.GetResult<Prisma.$SharedModelPayload, S>

  type SharedModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SharedModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SharedModelCountAggregateInputType | true
    }

  export interface SharedModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SharedModel'], meta: { name: 'SharedModel' } }
    /**
     * Find zero or one SharedModel that matches the filter.
     * @param {SharedModelFindUniqueArgs} args - Arguments to find a SharedModel
     * @example
     * // Get one SharedModel
     * const sharedModel = await prisma.sharedModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SharedModelFindUniqueArgs>(args: SelectSubset<T, SharedModelFindUniqueArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SharedModel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SharedModelFindUniqueOrThrowArgs} args - Arguments to find a SharedModel
     * @example
     * // Get one SharedModel
     * const sharedModel = await prisma.sharedModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SharedModelFindUniqueOrThrowArgs>(args: SelectSubset<T, SharedModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SharedModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelFindFirstArgs} args - Arguments to find a SharedModel
     * @example
     * // Get one SharedModel
     * const sharedModel = await prisma.sharedModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SharedModelFindFirstArgs>(args?: SelectSubset<T, SharedModelFindFirstArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SharedModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelFindFirstOrThrowArgs} args - Arguments to find a SharedModel
     * @example
     * // Get one SharedModel
     * const sharedModel = await prisma.sharedModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SharedModelFindFirstOrThrowArgs>(args?: SelectSubset<T, SharedModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SharedModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SharedModels
     * const sharedModels = await prisma.sharedModel.findMany()
     * 
     * // Get first 10 SharedModels
     * const sharedModels = await prisma.sharedModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sharedModelWithIdOnly = await prisma.sharedModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SharedModelFindManyArgs>(args?: SelectSubset<T, SharedModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SharedModel.
     * @param {SharedModelCreateArgs} args - Arguments to create a SharedModel.
     * @example
     * // Create one SharedModel
     * const SharedModel = await prisma.sharedModel.create({
     *   data: {
     *     // ... data to create a SharedModel
     *   }
     * })
     * 
     */
    create<T extends SharedModelCreateArgs>(args: SelectSubset<T, SharedModelCreateArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SharedModels.
     * @param {SharedModelCreateManyArgs} args - Arguments to create many SharedModels.
     * @example
     * // Create many SharedModels
     * const sharedModel = await prisma.sharedModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SharedModelCreateManyArgs>(args?: SelectSubset<T, SharedModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SharedModels and returns the data saved in the database.
     * @param {SharedModelCreateManyAndReturnArgs} args - Arguments to create many SharedModels.
     * @example
     * // Create many SharedModels
     * const sharedModel = await prisma.sharedModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SharedModels and only return the `id`
     * const sharedModelWithIdOnly = await prisma.sharedModel.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SharedModelCreateManyAndReturnArgs>(args?: SelectSubset<T, SharedModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SharedModel.
     * @param {SharedModelDeleteArgs} args - Arguments to delete one SharedModel.
     * @example
     * // Delete one SharedModel
     * const SharedModel = await prisma.sharedModel.delete({
     *   where: {
     *     // ... filter to delete one SharedModel
     *   }
     * })
     * 
     */
    delete<T extends SharedModelDeleteArgs>(args: SelectSubset<T, SharedModelDeleteArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SharedModel.
     * @param {SharedModelUpdateArgs} args - Arguments to update one SharedModel.
     * @example
     * // Update one SharedModel
     * const sharedModel = await prisma.sharedModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SharedModelUpdateArgs>(args: SelectSubset<T, SharedModelUpdateArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SharedModels.
     * @param {SharedModelDeleteManyArgs} args - Arguments to filter SharedModels to delete.
     * @example
     * // Delete a few SharedModels
     * const { count } = await prisma.sharedModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SharedModelDeleteManyArgs>(args?: SelectSubset<T, SharedModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SharedModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SharedModels
     * const sharedModel = await prisma.sharedModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SharedModelUpdateManyArgs>(args: SelectSubset<T, SharedModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SharedModel.
     * @param {SharedModelUpsertArgs} args - Arguments to update or create a SharedModel.
     * @example
     * // Update or create a SharedModel
     * const sharedModel = await prisma.sharedModel.upsert({
     *   create: {
     *     // ... data to create a SharedModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SharedModel we want to update
     *   }
     * })
     */
    upsert<T extends SharedModelUpsertArgs>(args: SelectSubset<T, SharedModelUpsertArgs<ExtArgs>>): Prisma__SharedModelClient<$Result.GetResult<Prisma.$SharedModelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SharedModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelCountArgs} args - Arguments to filter SharedModels to count.
     * @example
     * // Count the number of SharedModels
     * const count = await prisma.sharedModel.count({
     *   where: {
     *     // ... the filter for the SharedModels we want to count
     *   }
     * })
    **/
    count<T extends SharedModelCountArgs>(
      args?: Subset<T, SharedModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SharedModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SharedModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SharedModelAggregateArgs>(args: Subset<T, SharedModelAggregateArgs>): Prisma.PrismaPromise<GetSharedModelAggregateType<T>>

    /**
     * Group by SharedModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedModelGroupByArgs} args - Group by arguments.
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
      T extends SharedModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SharedModelGroupByArgs['orderBy'] }
        : { orderBy?: SharedModelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SharedModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSharedModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SharedModel model
   */
  readonly fields: SharedModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SharedModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SharedModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SharedModel model
   */ 
  interface SharedModelFieldRefs {
    readonly id: FieldRef<"SharedModel", 'String'>
    readonly projectId: FieldRef<"SharedModel", 'String'>
    readonly name: FieldRef<"SharedModel", 'String'>
    readonly filePath: FieldRef<"SharedModel", 'String'>
    readonly shareToken: FieldRef<"SharedModel", 'String'>
    readonly viewCount: FieldRef<"SharedModel", 'Int'>
    readonly createdBy: FieldRef<"SharedModel", 'String'>
    readonly isPublic: FieldRef<"SharedModel", 'Boolean'>
    readonly createdAt: FieldRef<"SharedModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SharedModel findUnique
   */
  export type SharedModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * Filter, which SharedModel to fetch.
     */
    where: SharedModelWhereUniqueInput
  }

  /**
   * SharedModel findUniqueOrThrow
   */
  export type SharedModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * Filter, which SharedModel to fetch.
     */
    where: SharedModelWhereUniqueInput
  }

  /**
   * SharedModel findFirst
   */
  export type SharedModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * Filter, which SharedModel to fetch.
     */
    where?: SharedModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedModels to fetch.
     */
    orderBy?: SharedModelOrderByWithRelationInput | SharedModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SharedModels.
     */
    cursor?: SharedModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SharedModels.
     */
    distinct?: SharedModelScalarFieldEnum | SharedModelScalarFieldEnum[]
  }

  /**
   * SharedModel findFirstOrThrow
   */
  export type SharedModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * Filter, which SharedModel to fetch.
     */
    where?: SharedModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedModels to fetch.
     */
    orderBy?: SharedModelOrderByWithRelationInput | SharedModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SharedModels.
     */
    cursor?: SharedModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SharedModels.
     */
    distinct?: SharedModelScalarFieldEnum | SharedModelScalarFieldEnum[]
  }

  /**
   * SharedModel findMany
   */
  export type SharedModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * Filter, which SharedModels to fetch.
     */
    where?: SharedModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedModels to fetch.
     */
    orderBy?: SharedModelOrderByWithRelationInput | SharedModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SharedModels.
     */
    cursor?: SharedModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedModels.
     */
    skip?: number
    distinct?: SharedModelScalarFieldEnum | SharedModelScalarFieldEnum[]
  }

  /**
   * SharedModel create
   */
  export type SharedModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * The data needed to create a SharedModel.
     */
    data: XOR<SharedModelCreateInput, SharedModelUncheckedCreateInput>
  }

  /**
   * SharedModel createMany
   */
  export type SharedModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SharedModels.
     */
    data: SharedModelCreateManyInput | SharedModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SharedModel createManyAndReturn
   */
  export type SharedModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SharedModels.
     */
    data: SharedModelCreateManyInput | SharedModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SharedModel update
   */
  export type SharedModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * The data needed to update a SharedModel.
     */
    data: XOR<SharedModelUpdateInput, SharedModelUncheckedUpdateInput>
    /**
     * Choose, which SharedModel to update.
     */
    where: SharedModelWhereUniqueInput
  }

  /**
   * SharedModel updateMany
   */
  export type SharedModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SharedModels.
     */
    data: XOR<SharedModelUpdateManyMutationInput, SharedModelUncheckedUpdateManyInput>
    /**
     * Filter which SharedModels to update
     */
    where?: SharedModelWhereInput
  }

  /**
   * SharedModel upsert
   */
  export type SharedModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * The filter to search for the SharedModel to update in case it exists.
     */
    where: SharedModelWhereUniqueInput
    /**
     * In case the SharedModel found by the `where` argument doesn't exist, create a new SharedModel with this data.
     */
    create: XOR<SharedModelCreateInput, SharedModelUncheckedCreateInput>
    /**
     * In case the SharedModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SharedModelUpdateInput, SharedModelUncheckedUpdateInput>
  }

  /**
   * SharedModel delete
   */
  export type SharedModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
    /**
     * Filter which SharedModel to delete.
     */
    where: SharedModelWhereUniqueInput
  }

  /**
   * SharedModel deleteMany
   */
  export type SharedModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SharedModels to delete
     */
    where?: SharedModelWhereInput
  }

  /**
   * SharedModel without action
   */
  export type SharedModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedModel
     */
    select?: SharedModelSelect<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    company: 'company',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    number: 'number',
    buildingType: 'buildingType',
    grossArea: 'grossArea',
    estimatedCost: 'estimatedCost',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const PlanFileScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    filePath: 'filePath',
    fileType: 'fileType',
    sheetNumber: 'sheetNumber',
    discipline: 'discipline',
    revision: 'revision',
    setName: 'setName',
    scale: 'scale',
    analysis: 'analysis',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt'
  };

  export type PlanFileScalarFieldEnum = (typeof PlanFileScalarFieldEnum)[keyof typeof PlanFileScalarFieldEnum]


  export const ClassificationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    color: 'color',
    costCode: 'costCode',
    unitRate: 'unitRate',
    unit: 'unit',
    companyWide: 'companyWide',
    projectId: 'projectId',
    createdAt: 'createdAt'
  };

  export type ClassificationScalarFieldEnum = (typeof ClassificationScalarFieldEnum)[keyof typeof ClassificationScalarFieldEnum]


  export const AssemblyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    unit: 'unit',
    description: 'description',
    components: 'components',
    totalCost: 'totalCost',
    companyWide: 'companyWide',
    projectId: 'projectId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssemblyScalarFieldEnum = (typeof AssemblyScalarFieldEnum)[keyof typeof AssemblyScalarFieldEnum]


  export const SharedModelScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    filePath: 'filePath',
    shareToken: 'shareToken',
    viewCount: 'viewCount',
    createdBy: 'createdBy',
    isPublic: 'isPublic',
    createdAt: 'createdAt'
  };

  export type SharedModelScalarFieldEnum = (typeof SharedModelScalarFieldEnum)[keyof typeof SharedModelScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    company?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    company?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    company?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    number?: StringFilter<"Project"> | string
    buildingType?: StringFilter<"Project"> | string
    grossArea?: FloatFilter<"Project"> | number
    estimatedCost?: FloatFilter<"Project"> | number
    createdBy?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    planFiles?: PlanFileListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    buildingType?: SortOrder
    grossArea?: SortOrder
    estimatedCost?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    planFiles?: PlanFileOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    number?: StringFilter<"Project"> | string
    buildingType?: StringFilter<"Project"> | string
    grossArea?: FloatFilter<"Project"> | number
    estimatedCost?: FloatFilter<"Project"> | number
    createdBy?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    planFiles?: PlanFileListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    buildingType?: SortOrder
    grossArea?: SortOrder
    estimatedCost?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    number?: StringWithAggregatesFilter<"Project"> | string
    buildingType?: StringWithAggregatesFilter<"Project"> | string
    grossArea?: FloatWithAggregatesFilter<"Project"> | number
    estimatedCost?: FloatWithAggregatesFilter<"Project"> | number
    createdBy?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type PlanFileWhereInput = {
    AND?: PlanFileWhereInput | PlanFileWhereInput[]
    OR?: PlanFileWhereInput[]
    NOT?: PlanFileWhereInput | PlanFileWhereInput[]
    id?: StringFilter<"PlanFile"> | string
    projectId?: StringFilter<"PlanFile"> | string
    name?: StringFilter<"PlanFile"> | string
    filePath?: StringFilter<"PlanFile"> | string
    fileType?: StringFilter<"PlanFile"> | string
    sheetNumber?: StringFilter<"PlanFile"> | string
    discipline?: StringFilter<"PlanFile"> | string
    revision?: StringFilter<"PlanFile"> | string
    setName?: StringFilter<"PlanFile"> | string
    scale?: FloatFilter<"PlanFile"> | number
    analysis?: StringFilter<"PlanFile"> | string
    sortOrder?: IntFilter<"PlanFile"> | number
    createdAt?: DateTimeFilter<"PlanFile"> | Date | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type PlanFileOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    sheetNumber?: SortOrder
    discipline?: SortOrder
    revision?: SortOrder
    setName?: SortOrder
    scale?: SortOrder
    analysis?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type PlanFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanFileWhereInput | PlanFileWhereInput[]
    OR?: PlanFileWhereInput[]
    NOT?: PlanFileWhereInput | PlanFileWhereInput[]
    projectId?: StringFilter<"PlanFile"> | string
    name?: StringFilter<"PlanFile"> | string
    filePath?: StringFilter<"PlanFile"> | string
    fileType?: StringFilter<"PlanFile"> | string
    sheetNumber?: StringFilter<"PlanFile"> | string
    discipline?: StringFilter<"PlanFile"> | string
    revision?: StringFilter<"PlanFile"> | string
    setName?: StringFilter<"PlanFile"> | string
    scale?: FloatFilter<"PlanFile"> | number
    analysis?: StringFilter<"PlanFile"> | string
    sortOrder?: IntFilter<"PlanFile"> | number
    createdAt?: DateTimeFilter<"PlanFile"> | Date | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }, "id">

  export type PlanFileOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    sheetNumber?: SortOrder
    discipline?: SortOrder
    revision?: SortOrder
    setName?: SortOrder
    scale?: SortOrder
    analysis?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    _count?: PlanFileCountOrderByAggregateInput
    _avg?: PlanFileAvgOrderByAggregateInput
    _max?: PlanFileMaxOrderByAggregateInput
    _min?: PlanFileMinOrderByAggregateInput
    _sum?: PlanFileSumOrderByAggregateInput
  }

  export type PlanFileScalarWhereWithAggregatesInput = {
    AND?: PlanFileScalarWhereWithAggregatesInput | PlanFileScalarWhereWithAggregatesInput[]
    OR?: PlanFileScalarWhereWithAggregatesInput[]
    NOT?: PlanFileScalarWhereWithAggregatesInput | PlanFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanFile"> | string
    projectId?: StringWithAggregatesFilter<"PlanFile"> | string
    name?: StringWithAggregatesFilter<"PlanFile"> | string
    filePath?: StringWithAggregatesFilter<"PlanFile"> | string
    fileType?: StringWithAggregatesFilter<"PlanFile"> | string
    sheetNumber?: StringWithAggregatesFilter<"PlanFile"> | string
    discipline?: StringWithAggregatesFilter<"PlanFile"> | string
    revision?: StringWithAggregatesFilter<"PlanFile"> | string
    setName?: StringWithAggregatesFilter<"PlanFile"> | string
    scale?: FloatWithAggregatesFilter<"PlanFile"> | number
    analysis?: StringWithAggregatesFilter<"PlanFile"> | string
    sortOrder?: IntWithAggregatesFilter<"PlanFile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PlanFile"> | Date | string
  }

  export type ClassificationWhereInput = {
    AND?: ClassificationWhereInput | ClassificationWhereInput[]
    OR?: ClassificationWhereInput[]
    NOT?: ClassificationWhereInput | ClassificationWhereInput[]
    id?: StringFilter<"Classification"> | string
    name?: StringFilter<"Classification"> | string
    category?: StringFilter<"Classification"> | string
    color?: StringFilter<"Classification"> | string
    costCode?: StringFilter<"Classification"> | string
    unitRate?: FloatFilter<"Classification"> | number
    unit?: StringFilter<"Classification"> | string
    companyWide?: BoolFilter<"Classification"> | boolean
    projectId?: StringFilter<"Classification"> | string
    createdAt?: DateTimeFilter<"Classification"> | Date | string
  }

  export type ClassificationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    color?: SortOrder
    costCode?: SortOrder
    unitRate?: SortOrder
    unit?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClassificationWhereInput | ClassificationWhereInput[]
    OR?: ClassificationWhereInput[]
    NOT?: ClassificationWhereInput | ClassificationWhereInput[]
    name?: StringFilter<"Classification"> | string
    category?: StringFilter<"Classification"> | string
    color?: StringFilter<"Classification"> | string
    costCode?: StringFilter<"Classification"> | string
    unitRate?: FloatFilter<"Classification"> | number
    unit?: StringFilter<"Classification"> | string
    companyWide?: BoolFilter<"Classification"> | boolean
    projectId?: StringFilter<"Classification"> | string
    createdAt?: DateTimeFilter<"Classification"> | Date | string
  }, "id">

  export type ClassificationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    color?: SortOrder
    costCode?: SortOrder
    unitRate?: SortOrder
    unit?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    _count?: ClassificationCountOrderByAggregateInput
    _avg?: ClassificationAvgOrderByAggregateInput
    _max?: ClassificationMaxOrderByAggregateInput
    _min?: ClassificationMinOrderByAggregateInput
    _sum?: ClassificationSumOrderByAggregateInput
  }

  export type ClassificationScalarWhereWithAggregatesInput = {
    AND?: ClassificationScalarWhereWithAggregatesInput | ClassificationScalarWhereWithAggregatesInput[]
    OR?: ClassificationScalarWhereWithAggregatesInput[]
    NOT?: ClassificationScalarWhereWithAggregatesInput | ClassificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Classification"> | string
    name?: StringWithAggregatesFilter<"Classification"> | string
    category?: StringWithAggregatesFilter<"Classification"> | string
    color?: StringWithAggregatesFilter<"Classification"> | string
    costCode?: StringWithAggregatesFilter<"Classification"> | string
    unitRate?: FloatWithAggregatesFilter<"Classification"> | number
    unit?: StringWithAggregatesFilter<"Classification"> | string
    companyWide?: BoolWithAggregatesFilter<"Classification"> | boolean
    projectId?: StringWithAggregatesFilter<"Classification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Classification"> | Date | string
  }

  export type AssemblyWhereInput = {
    AND?: AssemblyWhereInput | AssemblyWhereInput[]
    OR?: AssemblyWhereInput[]
    NOT?: AssemblyWhereInput | AssemblyWhereInput[]
    id?: StringFilter<"Assembly"> | string
    name?: StringFilter<"Assembly"> | string
    category?: StringFilter<"Assembly"> | string
    unit?: StringFilter<"Assembly"> | string
    description?: StringFilter<"Assembly"> | string
    components?: StringFilter<"Assembly"> | string
    totalCost?: FloatFilter<"Assembly"> | number
    companyWide?: BoolFilter<"Assembly"> | boolean
    projectId?: StringFilter<"Assembly"> | string
    createdAt?: DateTimeFilter<"Assembly"> | Date | string
    updatedAt?: DateTimeFilter<"Assembly"> | Date | string
  }

  export type AssemblyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    components?: SortOrder
    totalCost?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssemblyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssemblyWhereInput | AssemblyWhereInput[]
    OR?: AssemblyWhereInput[]
    NOT?: AssemblyWhereInput | AssemblyWhereInput[]
    name?: StringFilter<"Assembly"> | string
    category?: StringFilter<"Assembly"> | string
    unit?: StringFilter<"Assembly"> | string
    description?: StringFilter<"Assembly"> | string
    components?: StringFilter<"Assembly"> | string
    totalCost?: FloatFilter<"Assembly"> | number
    companyWide?: BoolFilter<"Assembly"> | boolean
    projectId?: StringFilter<"Assembly"> | string
    createdAt?: DateTimeFilter<"Assembly"> | Date | string
    updatedAt?: DateTimeFilter<"Assembly"> | Date | string
  }, "id">

  export type AssemblyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    components?: SortOrder
    totalCost?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssemblyCountOrderByAggregateInput
    _avg?: AssemblyAvgOrderByAggregateInput
    _max?: AssemblyMaxOrderByAggregateInput
    _min?: AssemblyMinOrderByAggregateInput
    _sum?: AssemblySumOrderByAggregateInput
  }

  export type AssemblyScalarWhereWithAggregatesInput = {
    AND?: AssemblyScalarWhereWithAggregatesInput | AssemblyScalarWhereWithAggregatesInput[]
    OR?: AssemblyScalarWhereWithAggregatesInput[]
    NOT?: AssemblyScalarWhereWithAggregatesInput | AssemblyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assembly"> | string
    name?: StringWithAggregatesFilter<"Assembly"> | string
    category?: StringWithAggregatesFilter<"Assembly"> | string
    unit?: StringWithAggregatesFilter<"Assembly"> | string
    description?: StringWithAggregatesFilter<"Assembly"> | string
    components?: StringWithAggregatesFilter<"Assembly"> | string
    totalCost?: FloatWithAggregatesFilter<"Assembly"> | number
    companyWide?: BoolWithAggregatesFilter<"Assembly"> | boolean
    projectId?: StringWithAggregatesFilter<"Assembly"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Assembly"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assembly"> | Date | string
  }

  export type SharedModelWhereInput = {
    AND?: SharedModelWhereInput | SharedModelWhereInput[]
    OR?: SharedModelWhereInput[]
    NOT?: SharedModelWhereInput | SharedModelWhereInput[]
    id?: StringFilter<"SharedModel"> | string
    projectId?: StringFilter<"SharedModel"> | string
    name?: StringFilter<"SharedModel"> | string
    filePath?: StringFilter<"SharedModel"> | string
    shareToken?: StringFilter<"SharedModel"> | string
    viewCount?: IntFilter<"SharedModel"> | number
    createdBy?: StringFilter<"SharedModel"> | string
    isPublic?: BoolFilter<"SharedModel"> | boolean
    createdAt?: DateTimeFilter<"SharedModel"> | Date | string
  }

  export type SharedModelOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    shareToken?: SortOrder
    viewCount?: SortOrder
    createdBy?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
  }

  export type SharedModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shareToken?: string
    AND?: SharedModelWhereInput | SharedModelWhereInput[]
    OR?: SharedModelWhereInput[]
    NOT?: SharedModelWhereInput | SharedModelWhereInput[]
    projectId?: StringFilter<"SharedModel"> | string
    name?: StringFilter<"SharedModel"> | string
    filePath?: StringFilter<"SharedModel"> | string
    viewCount?: IntFilter<"SharedModel"> | number
    createdBy?: StringFilter<"SharedModel"> | string
    isPublic?: BoolFilter<"SharedModel"> | boolean
    createdAt?: DateTimeFilter<"SharedModel"> | Date | string
  }, "id" | "shareToken">

  export type SharedModelOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    shareToken?: SortOrder
    viewCount?: SortOrder
    createdBy?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    _count?: SharedModelCountOrderByAggregateInput
    _avg?: SharedModelAvgOrderByAggregateInput
    _max?: SharedModelMaxOrderByAggregateInput
    _min?: SharedModelMinOrderByAggregateInput
    _sum?: SharedModelSumOrderByAggregateInput
  }

  export type SharedModelScalarWhereWithAggregatesInput = {
    AND?: SharedModelScalarWhereWithAggregatesInput | SharedModelScalarWhereWithAggregatesInput[]
    OR?: SharedModelScalarWhereWithAggregatesInput[]
    NOT?: SharedModelScalarWhereWithAggregatesInput | SharedModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SharedModel"> | string
    projectId?: StringWithAggregatesFilter<"SharedModel"> | string
    name?: StringWithAggregatesFilter<"SharedModel"> | string
    filePath?: StringWithAggregatesFilter<"SharedModel"> | string
    shareToken?: StringWithAggregatesFilter<"SharedModel"> | string
    viewCount?: IntWithAggregatesFilter<"SharedModel"> | number
    createdBy?: StringWithAggregatesFilter<"SharedModel"> | string
    isPublic?: BoolWithAggregatesFilter<"SharedModel"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SharedModel"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    company?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    company?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    company?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    number: string
    buildingType?: string
    grossArea?: number
    estimatedCost?: number
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    planFiles?: PlanFileCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    number: string
    buildingType?: string
    grossArea?: number
    estimatedCost?: number
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    planFiles?: PlanFileUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    buildingType?: StringFieldUpdateOperationsInput | string
    grossArea?: FloatFieldUpdateOperationsInput | number
    estimatedCost?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planFiles?: PlanFileUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    buildingType?: StringFieldUpdateOperationsInput | string
    grossArea?: FloatFieldUpdateOperationsInput | number
    estimatedCost?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planFiles?: PlanFileUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    number: string
    buildingType?: string
    grossArea?: number
    estimatedCost?: number
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    buildingType?: StringFieldUpdateOperationsInput | string
    grossArea?: FloatFieldUpdateOperationsInput | number
    estimatedCost?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    buildingType?: StringFieldUpdateOperationsInput | string
    grossArea?: FloatFieldUpdateOperationsInput | number
    estimatedCost?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFileCreateInput = {
    id?: string
    name: string
    filePath: string
    fileType?: string
    sheetNumber?: string
    discipline?: string
    revision?: string
    setName?: string
    scale?: number
    analysis?: string
    sortOrder?: number
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutPlanFilesInput
  }

  export type PlanFileUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    filePath: string
    fileType?: string
    sheetNumber?: string
    discipline?: string
    revision?: string
    setName?: string
    scale?: number
    analysis?: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type PlanFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutPlanFilesNestedInput
  }

  export type PlanFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFileCreateManyInput = {
    id?: string
    projectId: string
    name: string
    filePath: string
    fileType?: string
    sheetNumber?: string
    discipline?: string
    revision?: string
    setName?: string
    scale?: number
    analysis?: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type PlanFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassificationCreateInput = {
    id?: string
    name: string
    category?: string
    color?: string
    costCode?: string
    unitRate?: number
    unit?: string
    companyWide?: boolean
    projectId?: string
    createdAt?: Date | string
  }

  export type ClassificationUncheckedCreateInput = {
    id?: string
    name: string
    category?: string
    color?: string
    costCode?: string
    unitRate?: number
    unit?: string
    companyWide?: boolean
    projectId?: string
    createdAt?: Date | string
  }

  export type ClassificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    costCode?: StringFieldUpdateOperationsInput | string
    unitRate?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    costCode?: StringFieldUpdateOperationsInput | string
    unitRate?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassificationCreateManyInput = {
    id?: string
    name: string
    category?: string
    color?: string
    costCode?: string
    unitRate?: number
    unit?: string
    companyWide?: boolean
    projectId?: string
    createdAt?: Date | string
  }

  export type ClassificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    costCode?: StringFieldUpdateOperationsInput | string
    unitRate?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    costCode?: StringFieldUpdateOperationsInput | string
    unitRate?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssemblyCreateInput = {
    id?: string
    name: string
    category?: string
    unit?: string
    description?: string
    components?: string
    totalCost?: number
    companyWide?: boolean
    projectId?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssemblyUncheckedCreateInput = {
    id?: string
    name: string
    category?: string
    unit?: string
    description?: string
    components?: string
    totalCost?: number
    companyWide?: boolean
    projectId?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssemblyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    components?: StringFieldUpdateOperationsInput | string
    totalCost?: FloatFieldUpdateOperationsInput | number
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssemblyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    components?: StringFieldUpdateOperationsInput | string
    totalCost?: FloatFieldUpdateOperationsInput | number
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssemblyCreateManyInput = {
    id?: string
    name: string
    category?: string
    unit?: string
    description?: string
    components?: string
    totalCost?: number
    companyWide?: boolean
    projectId?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssemblyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    components?: StringFieldUpdateOperationsInput | string
    totalCost?: FloatFieldUpdateOperationsInput | number
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssemblyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    components?: StringFieldUpdateOperationsInput | string
    totalCost?: FloatFieldUpdateOperationsInput | number
    companyWide?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedModelCreateInput = {
    id?: string
    projectId: string
    name: string
    filePath: string
    shareToken: string
    viewCount?: number
    createdBy?: string
    isPublic?: boolean
    createdAt?: Date | string
  }

  export type SharedModelUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    filePath: string
    shareToken: string
    viewCount?: number
    createdBy?: string
    isPublic?: boolean
    createdAt?: Date | string
  }

  export type SharedModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    shareToken?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    shareToken?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedModelCreateManyInput = {
    id?: string
    projectId: string
    name: string
    filePath: string
    shareToken: string
    viewCount?: number
    createdBy?: string
    isPublic?: boolean
    createdAt?: Date | string
  }

  export type SharedModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    shareToken?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    shareToken?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type PlanFileListRelationFilter = {
    every?: PlanFileWhereInput
    some?: PlanFileWhereInput
    none?: PlanFileWhereInput
  }

  export type PlanFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    buildingType?: SortOrder
    grossArea?: SortOrder
    estimatedCost?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    grossArea?: SortOrder
    estimatedCost?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    buildingType?: SortOrder
    grossArea?: SortOrder
    estimatedCost?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    buildingType?: SortOrder
    grossArea?: SortOrder
    estimatedCost?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    grossArea?: SortOrder
    estimatedCost?: SortOrder
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

  export type ProjectRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type PlanFileCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    sheetNumber?: SortOrder
    discipline?: SortOrder
    revision?: SortOrder
    setName?: SortOrder
    scale?: SortOrder
    analysis?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanFileAvgOrderByAggregateInput = {
    scale?: SortOrder
    sortOrder?: SortOrder
  }

  export type PlanFileMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    sheetNumber?: SortOrder
    discipline?: SortOrder
    revision?: SortOrder
    setName?: SortOrder
    scale?: SortOrder
    analysis?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanFileMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    fileType?: SortOrder
    sheetNumber?: SortOrder
    discipline?: SortOrder
    revision?: SortOrder
    setName?: SortOrder
    scale?: SortOrder
    analysis?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanFileSumOrderByAggregateInput = {
    scale?: SortOrder
    sortOrder?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ClassificationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    color?: SortOrder
    costCode?: SortOrder
    unitRate?: SortOrder
    unit?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassificationAvgOrderByAggregateInput = {
    unitRate?: SortOrder
  }

  export type ClassificationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    color?: SortOrder
    costCode?: SortOrder
    unitRate?: SortOrder
    unit?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassificationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    color?: SortOrder
    costCode?: SortOrder
    unitRate?: SortOrder
    unit?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassificationSumOrderByAggregateInput = {
    unitRate?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AssemblyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    components?: SortOrder
    totalCost?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssemblyAvgOrderByAggregateInput = {
    totalCost?: SortOrder
  }

  export type AssemblyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    components?: SortOrder
    totalCost?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssemblyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    components?: SortOrder
    totalCost?: SortOrder
    companyWide?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssemblySumOrderByAggregateInput = {
    totalCost?: SortOrder
  }

  export type SharedModelCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    shareToken?: SortOrder
    viewCount?: SortOrder
    createdBy?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
  }

  export type SharedModelAvgOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type SharedModelMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    shareToken?: SortOrder
    viewCount?: SortOrder
    createdBy?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
  }

  export type SharedModelMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    filePath?: SortOrder
    shareToken?: SortOrder
    viewCount?: SortOrder
    createdBy?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
  }

  export type SharedModelSumOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlanFileCreateNestedManyWithoutProjectInput = {
    create?: XOR<PlanFileCreateWithoutProjectInput, PlanFileUncheckedCreateWithoutProjectInput> | PlanFileCreateWithoutProjectInput[] | PlanFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PlanFileCreateOrConnectWithoutProjectInput | PlanFileCreateOrConnectWithoutProjectInput[]
    createMany?: PlanFileCreateManyProjectInputEnvelope
    connect?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
  }

  export type PlanFileUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<PlanFileCreateWithoutProjectInput, PlanFileUncheckedCreateWithoutProjectInput> | PlanFileCreateWithoutProjectInput[] | PlanFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PlanFileCreateOrConnectWithoutProjectInput | PlanFileCreateOrConnectWithoutProjectInput[]
    createMany?: PlanFileCreateManyProjectInputEnvelope
    connect?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlanFileUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PlanFileCreateWithoutProjectInput, PlanFileUncheckedCreateWithoutProjectInput> | PlanFileCreateWithoutProjectInput[] | PlanFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PlanFileCreateOrConnectWithoutProjectInput | PlanFileCreateOrConnectWithoutProjectInput[]
    upsert?: PlanFileUpsertWithWhereUniqueWithoutProjectInput | PlanFileUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PlanFileCreateManyProjectInputEnvelope
    set?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    disconnect?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    delete?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    connect?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    update?: PlanFileUpdateWithWhereUniqueWithoutProjectInput | PlanFileUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PlanFileUpdateManyWithWhereWithoutProjectInput | PlanFileUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PlanFileScalarWhereInput | PlanFileScalarWhereInput[]
  }

  export type PlanFileUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PlanFileCreateWithoutProjectInput, PlanFileUncheckedCreateWithoutProjectInput> | PlanFileCreateWithoutProjectInput[] | PlanFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PlanFileCreateOrConnectWithoutProjectInput | PlanFileCreateOrConnectWithoutProjectInput[]
    upsert?: PlanFileUpsertWithWhereUniqueWithoutProjectInput | PlanFileUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PlanFileCreateManyProjectInputEnvelope
    set?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    disconnect?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    delete?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    connect?: PlanFileWhereUniqueInput | PlanFileWhereUniqueInput[]
    update?: PlanFileUpdateWithWhereUniqueWithoutProjectInput | PlanFileUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PlanFileUpdateManyWithWhereWithoutProjectInput | PlanFileUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PlanFileScalarWhereInput | PlanFileScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutPlanFilesInput = {
    create?: XOR<ProjectCreateWithoutPlanFilesInput, ProjectUncheckedCreateWithoutPlanFilesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPlanFilesInput
    connect?: ProjectWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutPlanFilesNestedInput = {
    create?: XOR<ProjectCreateWithoutPlanFilesInput, ProjectUncheckedCreateWithoutPlanFilesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPlanFilesInput
    upsert?: ProjectUpsertWithoutPlanFilesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutPlanFilesInput, ProjectUpdateWithoutPlanFilesInput>, ProjectUncheckedUpdateWithoutPlanFilesInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PlanFileCreateWithoutProjectInput = {
    id?: string
    name: string
    filePath: string
    fileType?: string
    sheetNumber?: string
    discipline?: string
    revision?: string
    setName?: string
    scale?: number
    analysis?: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type PlanFileUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    filePath: string
    fileType?: string
    sheetNumber?: string
    discipline?: string
    revision?: string
    setName?: string
    scale?: number
    analysis?: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type PlanFileCreateOrConnectWithoutProjectInput = {
    where: PlanFileWhereUniqueInput
    create: XOR<PlanFileCreateWithoutProjectInput, PlanFileUncheckedCreateWithoutProjectInput>
  }

  export type PlanFileCreateManyProjectInputEnvelope = {
    data: PlanFileCreateManyProjectInput | PlanFileCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type PlanFileUpsertWithWhereUniqueWithoutProjectInput = {
    where: PlanFileWhereUniqueInput
    update: XOR<PlanFileUpdateWithoutProjectInput, PlanFileUncheckedUpdateWithoutProjectInput>
    create: XOR<PlanFileCreateWithoutProjectInput, PlanFileUncheckedCreateWithoutProjectInput>
  }

  export type PlanFileUpdateWithWhereUniqueWithoutProjectInput = {
    where: PlanFileWhereUniqueInput
    data: XOR<PlanFileUpdateWithoutProjectInput, PlanFileUncheckedUpdateWithoutProjectInput>
  }

  export type PlanFileUpdateManyWithWhereWithoutProjectInput = {
    where: PlanFileScalarWhereInput
    data: XOR<PlanFileUpdateManyMutationInput, PlanFileUncheckedUpdateManyWithoutProjectInput>
  }

  export type PlanFileScalarWhereInput = {
    AND?: PlanFileScalarWhereInput | PlanFileScalarWhereInput[]
    OR?: PlanFileScalarWhereInput[]
    NOT?: PlanFileScalarWhereInput | PlanFileScalarWhereInput[]
    id?: StringFilter<"PlanFile"> | string
    projectId?: StringFilter<"PlanFile"> | string
    name?: StringFilter<"PlanFile"> | string
    filePath?: StringFilter<"PlanFile"> | string
    fileType?: StringFilter<"PlanFile"> | string
    sheetNumber?: StringFilter<"PlanFile"> | string
    discipline?: StringFilter<"PlanFile"> | string
    revision?: StringFilter<"PlanFile"> | string
    setName?: StringFilter<"PlanFile"> | string
    scale?: FloatFilter<"PlanFile"> | number
    analysis?: StringFilter<"PlanFile"> | string
    sortOrder?: IntFilter<"PlanFile"> | number
    createdAt?: DateTimeFilter<"PlanFile"> | Date | string
  }

  export type ProjectCreateWithoutPlanFilesInput = {
    id?: string
    name: string
    number: string
    buildingType?: string
    grossArea?: number
    estimatedCost?: number
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateWithoutPlanFilesInput = {
    id?: string
    name: string
    number: string
    buildingType?: string
    grossArea?: number
    estimatedCost?: number
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutPlanFilesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutPlanFilesInput, ProjectUncheckedCreateWithoutPlanFilesInput>
  }

  export type ProjectUpsertWithoutPlanFilesInput = {
    update: XOR<ProjectUpdateWithoutPlanFilesInput, ProjectUncheckedUpdateWithoutPlanFilesInput>
    create: XOR<ProjectCreateWithoutPlanFilesInput, ProjectUncheckedCreateWithoutPlanFilesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutPlanFilesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutPlanFilesInput, ProjectUncheckedUpdateWithoutPlanFilesInput>
  }

  export type ProjectUpdateWithoutPlanFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    buildingType?: StringFieldUpdateOperationsInput | string
    grossArea?: FloatFieldUpdateOperationsInput | number
    estimatedCost?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateWithoutPlanFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    buildingType?: StringFieldUpdateOperationsInput | string
    grossArea?: FloatFieldUpdateOperationsInput | number
    estimatedCost?: FloatFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFileCreateManyProjectInput = {
    id?: string
    name: string
    filePath: string
    fileType?: string
    sheetNumber?: string
    discipline?: string
    revision?: string
    setName?: string
    scale?: number
    analysis?: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type PlanFileUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFileUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFileUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    sheetNumber?: StringFieldUpdateOperationsInput | string
    discipline?: StringFieldUpdateOperationsInput | string
    revision?: StringFieldUpdateOperationsInput | string
    setName?: StringFieldUpdateOperationsInput | string
    scale?: FloatFieldUpdateOperationsInput | number
    analysis?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProjectCountOutputTypeDefaultArgs instead
     */
    export type ProjectCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectDefaultArgs instead
     */
    export type ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlanFileDefaultArgs instead
     */
    export type PlanFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlanFileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassificationDefaultArgs instead
     */
    export type ClassificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AssemblyDefaultArgs instead
     */
    export type AssemblyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AssemblyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SharedModelDefaultArgs instead
     */
    export type SharedModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SharedModelDefaultArgs<ExtArgs>

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
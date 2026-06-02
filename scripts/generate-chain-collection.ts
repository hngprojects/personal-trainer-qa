import fs from "fs";
import path from "path";

type PostmanEvent = {
  listen: string;
  script: {
    type: string;
    exec: string[];
  };
};

type PostmanItem = {
  name: string;
  item?: PostmanItem[];
  request?: unknown;
  response?: unknown[];
  event?: PostmanEvent[];
  [key: string]: unknown;
};

type PostmanCollection = {
  info: Record<string, unknown>;
  item: PostmanItem[];
  variable?: unknown[];
  [key: string]: unknown;
};

const sourceCollectionPath = path.resolve(
  "postman/Personal-Trainer-Staging.postman_collection.json"
);

const outputCollectionPath = path.resolve(
  "postman/FitCall-MVP-Chained.postman_collection.json"
);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectRequests(items: PostmanItem[], result: PostmanItem[] = []): PostmanItem[] {
  for (const item of items) {
    if (item.item) {
      collectRequests(item.item, result);
    } else if (item.request) {
      result.push(item);
    }
  }

  return result;
}

function findRequestByName(collection: PostmanCollection, query: string): PostmanItem {
  const requests = collectRequests(collection.item);
  const normalizedQuery = normalize(query);

  const found = requests.find((request) =>
    normalize(request.name).includes(normalizedQuery)
  );

  if (!found) {
    throw new Error(`Request not found in source collection: ${query}`);
  }

  return clone(found);
}

function fromSource(
  collection: PostmanCollection,
  newName: string,
  sourceNameQuery: string
): PostmanItem {
  const item = findRequestByName(collection, sourceNameQuery);
  item.name = newName;
  return item;
}

function jsonTestScript(lines: string[]): PostmanEvent[] {
  return [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: lines
      }
    }
  ];
}

function jsonRequest(params: {
  name: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  route: string;
  tokenVariable?: string;
  body?: Record<string, unknown>;
  tests?: string[];
  description?: string;
}): PostmanItem {
  const headers: Array<{ key: string; value: string }> = [];

  if (params.tokenVariable) {
    headers.push({
      key: "Authorization",
      value: `Bearer {{${params.tokenVariable}}}`
    });
  }

  if (params.body) {
    headers.push({
      key: "Content-Type",
      value: "application/json"
    });
  }

  return {
    name: params.name,
    request: {
      method: params.method,
      header: headers,
      body: params.body
        ? {
            mode: "raw",
            raw: JSON.stringify(params.body, null, 2),
            options: {
              raw: {
                language: "json"
              }
            }
          }
        : undefined,
      url: {
        raw: `{{base_url}}${params.route}`,
        host: ["{{base_url}}"],
        path: params.route.split("/").filter(Boolean)
      },
      description: params.description || ""
    },
    response: [],
    event: jsonTestScript(
      params.tests || [
        "pm.test('Status is not 500', () => pm.response.to.not.have.status(500));"
      ]
    )
  };
}

function folder(name: string, items: PostmanItem[]): PostmanItem {
  return {
    name,
    item: items
  };
}

function buildChainCollection(source: PostmanCollection): PostmanCollection {
  const chainCollection: PostmanCollection = {
    ...clone(source),
    info: {
      ...clone(source.info),
      name: "FitCall MVP Chained Regression",
      description:
        "Chain-focused MVP regression suite generated from the Personal Trainer staging collection."
    },
    item: [
      folder("00 - Smoke and Public Checks", [
        fromSource(source, "Health check", "health check"),
        fromSource(source, "Root endpoint", "root endpoint"),
        fromSource(source, "Contact form valid submission", "contact us valid"),
        fromSource(source, "Contact form missing required fields", "contact us missing all required fields"),
        fromSource(source, "Waitlist valid email", "add to waitlist valid email"),
        fromSource(source, "Waitlist duplicate email", "add to waitlist duplicate email"),
        fromSource(source, "Waitlist invalid email", "add to waitlist invalid email")
      ]),

      folder("01 - Admin Trainer Management Chain", [
        fromSource(source, "Step 1 - Admin login", "setup admin login"),
        fromSource(source, "Step 2 - Create trainer", "create trainer happy path"),
        fromSource(source, "Step 3 - Fetch created trainer", "get trainer by id valid"),
        fromSource(source, "Step 4 - Update trainer", "update trainer valid fields"),
        fromSource(source, "Step 5 - Fetch updated trainer", "get trainer by id valid"),
        fromSource(source, "Step 6 - Delete trainer cleanup", "delete trainer valid cleanup")
      ]),

      folder("02 - Client Onboarding and Trainer Discovery Chain", [
        fromSource(source, "Step 1 - Register client account", "register client account"),
        fromSource(source, "Step 2 - Verify client email", "verify client email"),
        fromSource(source, "Step 3 - Fetch client profile", "get user profile valid auth"),
        fromSource(source, "Step 4 - Update client profile", "update user profile valid fields"),
        fromSource(source, "Step 5 - List trainers", "list trainers valid auth"),
        fromSource(source, "Step 6 - Fetch trainer profile", "get trainer by id valid")
      ]),

      folder("03 - Discovery Booking Chain", [
        fromSource(source, "Step 1 - Admin creates discovery slot", "post create discovery slot"),
        fromSource(source, "Step 2 - Client lists discovery slots", "get discovery slots"),
        jsonRequest({
          name: "Step 3 - Client books discovery call",
          method: "POST",
          route: "/bookings/discovery",
          tokenVariable: "client_token",
          body: {
            name: "QA Test Client",
            email: "{{client_email}}",
            contact_mode: "scheduled_meeting",
            trainer_id: "{{created_trainer_id}}",
            selected_datetime: "2026-06-10T10:00:00Z",
            timezone: "Africa/Lagos"
          },
          tests: [
            "pm.test('Status 200 or 201', () => pm.expect([200, 201]).to.include(pm.response.code));",
            "const json = pm.response.json();",
            "if (json.data && json.data.id) pm.collectionVariables.set('created_booking_id', json.data.id);"
          ],
          description:
            "Happy-path discovery booking request. Requires client_token and created_trainer_id."
        }),
        fromSource(source, "Step 4 - Client views upcoming bookings", "get upcoming bookings valid auth"),
        fromSource(source, "Step 5 - Admin views discovery bookings", "get admin discovery bookings paginated")
      ]),

      folder("04 - Trainer Availability Chain", [
        fromSource(source, "Step 1 - Trainer sets availability", "set availability valid"),
        fromSource(source, "Step 2 - Trainer fetches own availability", "get trainer own availability me"),
        fromSource(source, "Step 3 - Fetch trainer availability by ID", "get trainer availability by id"),
        fromSource(source, "Step 4 - Invalid timezone is rejected", "set availability invalid timezone")
      ]),

      folder("05 - Session Lifecycle Chain", [
        jsonRequest({
          name: "Step 1 - Fetch session details",
          method: "GET",
          route: "/sessions/{{created_session_id}}",
          tokenVariable: "client_token",
          tests: [
            "pm.test('Status 200', () => pm.response.to.have.status(200));",
            "const json = pm.response.json();",
            "pm.test('Has session data', () => pm.expect(json).to.have.property('data'));"
          ],
          description: "Requires created_session_id from valid booking/session setup."
        }),
        jsonRequest({
          name: "Step 2 - Trainer starts session",
          method: "PUT",
          route: "/sessions/{{created_session_id}}/start",
          tokenVariable: "trainer_token",
          tests: [
            "pm.test('Status 200', () => pm.response.to.have.status(200));"
          ]
        }),
        jsonRequest({
          name: "Step 3 - Client joins session",
          method: "PUT",
          route: "/sessions/{{created_session_id}}/join",
          tokenVariable: "client_token",
          tests: [
            "pm.test('Status 200', () => pm.response.to.have.status(200));"
          ]
        }),
        jsonRequest({
          name: "Step 4 - Trainer completes session",
          method: "PUT",
          route: "/sessions/{{created_session_id}}/complete",
          tokenVariable: "trainer_token",
          tests: [
            "pm.test('Status 200', () => pm.response.to.have.status(200));"
          ]
        }),
        jsonRequest({
          name: "Step 5 - Trainer adds session notes",
          method: "PUT",
          route: "/sessions/{{created_session_id}}/notes",
          tokenVariable: "trainer_token",
          body: {
            note: "QA regression note for completed session."
          },
          tests: [
            "pm.test('Status 200', () => pm.response.to.have.status(200));"
          ]
        })
      ]),

      folder("06 - Subscription Access Chain", [
        fromSource(source, "Step 1 - View subscription plans", "subscriptions plans list plans"),
        fromSource(source, "Step 2 - Create subscription using Google IAP", "subscriptions create via google iap"),
        fromSource(source, "Step 3 - Fetch active subscription", "my active subscription"),
        fromSource(source, "Step 4 - Fetch subscription usage", "subscriptions me usage"),
        fromSource(source, "Step 5 - Attempt paid training booking", "create booking happy path"),
        fromSource(source, "Step 6 - Cancel subscription", "cancel subscription cancel")
      ]),

      folder("07 - Non-Subscribed Access Restriction Chain", [
        fromSource(source, "Step 1 - Fetch active subscription", "my active subscription"),
        jsonRequest({
          name: "Step 2 - Attempt paid booking without subscription",
          method: "POST",
          route: "/bookings",
          tokenVariable: "client_token",
          body: {
            trainer_id: "{{created_trainer_id}}",
            subscription_id: "00000000-0000-0000-0000-000000000000",
            scheduled_start: "2026-06-10T10:00:00Z",
            scheduled_end: "2026-06-10T11:00:00Z",
            session_platform: "zoom",
            timezone: "Africa/Lagos"
          },
          tests: [
            "pm.test('Status is 400, 401, 403 or 404', () => pm.expect([400, 401, 403, 404]).to.include(pm.response.code));",
            "pm.test('Does not create unauthorized paid booking', () => pm.response.to.not.have.status(201));"
          ],
          description:
            "Access-control test. A non-subscribed client should not be able to create a paid training booking."
        }),
        fromSource(source, "Step 3 - Confirm upcoming bookings", "get upcoming bookings valid auth")
      ]),

      folder("99 - Negative and Security Regression", [
        fromSource(source, "Admin login wrong password", "admin login wrong password"),
        fromSource(source, "Admin login missing fields", "admin login missing fields"),
        fromSource(source, "Trainer list no auth", "list trainers no auth"),
        fromSource(source, "Create trainer no auth", "create trainer no auth"),
        fromSource(source, "Get trainer invalid UUID", "invalid uuid"),
        fromSource(source, "Discovery booking missing fields", "book discovery call missing required fields"),
        fromSource(source, "Phone callback missing phone number", "phone callback missing phone number"),
        fromSource(source, "Subscription missing fields", "subscriptions missing fields"),
        fromSource(source, "Notifications no auth", "notifications no auth")
      ])
    ]
  };

  return chainCollection;
}

function main(): void {
  if (!fs.existsSync(sourceCollectionPath)) {
    throw new Error(`Source collection not found: ${sourceCollectionPath}`);
  }

  const raw = fs.readFileSync(sourceCollectionPath, "utf8");
  const source = JSON.parse(raw) as PostmanCollection;

  const chainCollection = buildChainCollection(source);

  fs.writeFileSync(
    outputCollectionPath,
    JSON.stringify(chainCollection, null, 2),
    "utf8"
  );

  console.log("Chain-focused Postman collection generated.");
  console.log(`Output: ${outputCollectionPath}`);
}

main();
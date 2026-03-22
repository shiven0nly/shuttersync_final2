import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  // Find this in your Clerk Dashboard -> Webhooks -> [Endpoint] -> Webhook Secret
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local')
  }

  // Get the headers from the request
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no necessary headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Parse the raw body exactly as a string
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance using your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload using Svix
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Process the verified webhook event
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id } = evt.data;
    
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    
    try {
      // Connect to Clerk API
      const client = await clerkClient()
      
      // Update the user's public metadata to assign default "user" role
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          role: 'user'
        }
      });
      console.log(`Successfully assigned default 'user' role to clerkId ${id}`);
    } catch (error) {
       console.error('Error assigning role metadata to user.created:', error);
       return new Response('Error assigning metadata, but event received', { status: 500 });
    }
  }

  return new Response('', { status: 200 })
}

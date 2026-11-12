export type Status = 'Implemented' | 'Integration ready' | 'Planned';
export type Feature = { title: string; description: string; category: string; status: Status };
export const features: Feature[] = [
  { title: 'Live video & voice rooms', description: 'Room creation, admission, roles, speaker seats, invitations, audience controls and presence.', category: 'Connect', status: 'Implemented' },
  { title: 'Live audio & video transport', description: 'Agora SDK, account-bound tokens and renewal are integrated. Provider configuration and two-device verification remain.', category: 'Connect', status: 'Integration ready' },
  { title: 'Video & voice PK battles', description: '1v1 and team invitations, accept or reject, shared-room participation, gift scoring and host controls.', category: 'Create', status: 'Implemented' },
  { title: 'Moments & Reels', description: 'Photo albums, video and text posts, tags, location, privacy, likes, comments and creator discovery.', category: 'Create', status: 'Implemented' },
  { title: 'Friends & private messaging', description: 'Follow and friend requests, direct conversations, attachments, read markers and recipient-controlled privacy.', category: 'Connect', status: 'Implemented' },
  { title: 'Groups & community', description: 'Private membership, durable group conversations, invitations and role-based group management.', category: 'Connect', status: 'Implemented' },
  { title: 'Virtual gifts & effects', description: 'Multi-recipient gifts, animated celebrations, gift ownership and creator gift showcases.', category: 'Earn', status: 'Implemented' },
  { title: 'Wallet & transaction ledger', description: 'Server-managed balances, transaction history, protected spending and retry-safe wallet operations.', category: 'Earn', status: 'Implemented' },
  { title: 'VIP, Noble & virtual store', description: 'Server-priced memberships, expiring entitlements, avatar frames, owned items and equipment.', category: 'Earn', status: 'Implemented' },
  { title: 'Agency & host management', description: 'Applications, invitations, team roles, host targets, announcements, agency Moments and staff review.', category: 'Grow', status: 'Implemented' },
  { title: 'Business development tools', description: 'Scoped agency workflows, source approvals, transfers and audited platform review.', category: 'Grow', status: 'Implemented' },
  { title: 'Rankings, levels & daily tasks', description: 'Derived rankings, verified activity, XP claims, progression, badges and event registrations.', category: 'Grow', status: 'Implemented' },
  { title: 'Party & room studio', description: 'Funded coin envelopes, unclaimed refunds and free spotlight draws. Broadcast music and voice effects depend on live media setup.', category: 'Create', status: 'Implemented' },
  { title: 'Play lounge', description: 'Solo Ludo against a labeled bot, Memory Garden, Quick Quiz and Glow Rush. No cash wagers or coin rewards.', category: 'Connect', status: 'Implemented' },
  { title: 'Profiles & Rina Card', description: 'Editable profiles, social connections, gift showcases and a personalized card with native image sharing.', category: 'Create', status: 'Implemented' },
  { title: 'Account safety & moderation', description: 'Secure sessions, privacy preferences, blocking, reports, support tickets, moderation roles and audit records.', category: 'Connect', status: 'Implemented' },
  { title: 'Stripe sandbox checkout', description: 'Test-only checkout and signed webhooks are implemented. Account configuration and a provider-backed purchase still need verification.', category: 'Earn', status: 'Integration ready' },
  { title: 'Public launch infrastructure', description: 'Production HTTPS hosting, database backups, storage, email delivery, monitoring and final policies require deployment and validation.', category: 'Grow', status: 'Planned' },
  { title: 'Live payments & creator payouts', description: 'Real-money charges, bank withdrawals, settlement and production reconciliation remain disabled pending implementation and review.', category: 'Earn', status: 'Planned' },
  { title: 'Background push notifications', description: 'FCM and APNs delivery for messages, invitations and reminders beyond the active app.', category: 'Connect', status: 'Planned' },
  { title: 'Video processing pipeline', description: 'Transcoding, generated thumbnails, codec and duration validation, and production media processing.', category: 'Create', status: 'Planned' },
  { title: 'Realtime delivery at scale', description: 'Move beyond current foreground HTTP polling as concurrency and operational needs grow.', category: 'Grow', status: 'Planned' },
];
export const investorEmail = process.env.NEXT_PUBLIC_INVESTOR_EMAIL?.trim() || 'faizanrasool041@gmail.com';
export const roadmap = [
  { number: '01', label: 'FOUNDATION', status: 'Implemented', title: 'Build the connected experience', text: 'A Flutter app and authenticated backend spanning live rooms, social content, gifting, community and creator operations.', items: ['Core product journeys', 'Server-authorized actions', 'Creator & agency workflows'] },
  { number: '02', label: 'VALIDATION', status: 'Next milestone', title: 'Prove the complete journey', text: 'Verify live audio and video on physical devices, configure provider accounts, and complete a signed sandbox purchase.', items: ['Two-device media verification', 'Email & authentication providers', 'Sandbox payment validation'] },
  { number: '03', label: 'LAUNCH READINESS', status: 'Planned', title: 'Prepare for a reliable launch', text: 'Deploy production infrastructure, strengthen media delivery, add push notifications and finalize operating policies.', items: ['Hosting, storage & monitoring', 'Push & video processing', 'Moderation operations'] },
  { number: '04', label: 'GROWTH', status: 'Planned', title: 'Activate the creator ecosystem', text: 'Validate launch communities and agency onboarding, then expand with measured engagement and sustainable economics.', items: ['Creator & agency onboarding', 'Retention & cohort measurement', 'Payments & payout readiness'] },
];

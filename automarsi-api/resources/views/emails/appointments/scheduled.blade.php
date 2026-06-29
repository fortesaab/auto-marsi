<!DOCTYPE html>
@php
    $mailContext = $context ?? 'scheduled';
@endphp
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
        {{ $mailContext === 'updated' ? 'Your AutoMarsi appointment was updated' : 'Your AutoMarsi appointment is scheduled' }}
    </title>
</head>
<body style="margin: 0; background: #f6f7f9; color: #111827; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f6f7f9; padding: 32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; overflow: hidden; border: 1px solid #e5e7eb; border-radius: 16px; background: #ffffff;">
                    <tr>
                        <td style="padding: 28px 32px 20px;">
                            <p style="margin: 0 0 8px; color: #dc2626; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                                AutoMarsi
                            </p>

                            <h1 style="margin: 0; color: #111827; font-size: 26px; line-height: 1.25;">
                                {{ $mailContext === 'updated' ? 'Your appointment was updated' : 'Your appointment is scheduled' }}
                            </h1>

                            <p style="margin: 14px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                                Hello {{ $appointment->name }},
                                @if ($mailContext === 'updated')
                                    your AutoMarsi appointment details have changed.
                                @else
                                    we have scheduled your visit with AutoMarsi.
                                @endif
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 32px 24px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-radius: 12px; background: #f9fafb; border: 1px solid #eef0f3;">
                                <tr>
                                    <td style="padding: 18px 20px;">
                                        <p style="margin: 0 0 6px; color: #6b7280; font-size: 13px;">Date and time</p>
                                        <p style="margin: 0; color: #111827; font-size: 18px; font-weight: 700;">
                                            {{ $appointment->preferred_at?->timezone(config('automarsi.timezone'))->format('d M Y, H:i') }}
                                        </p>
                                    </td>
                                </tr>

                                @if ($appointment->listing)
                                    <tr>
                                        <td style="padding: 0 20px 18px;">
                                            <p style="margin: 0 0 6px; color: #6b7280; font-size: 13px;">Vehicle</p>
                                            <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 700;">
                                                {{ $appointment->listing->title }}
                                            </p>
                                        </td>
                                    </tr>
                                @endif

                                @if ($appointment->message)
                                    <tr>
                                        <td style="padding: 0 20px 18px;">
                                            <p style="margin: 0 0 6px; color: #6b7280; font-size: 13px;">Notes</p>
                                            <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6;">
                                                {{ $appointment->message }}
                                            </p>
                                        </td>
                                    </tr>
                                @endif
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 32px 28px;">
                            <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                                If you need to change the time, please contact the AutoMarsi team before your appointment.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="border-top: 1px solid #e5e7eb; padding: 18px 32px; background: #fcfcfd;">
                            <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                                AutoMarsi<br>
                                Quality vehicles, transparent deals, and trusted support.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

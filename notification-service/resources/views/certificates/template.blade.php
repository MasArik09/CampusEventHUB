<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            background: #f4f6f8;
            padding: 30px;
        }

        .certificate {
            border: 10px solid #1f2937;
            padding: 45px;
            height: 570px;
            background: #ffffff;
            text-align: center;
            position: relative;
        }

        .inner-border {
            border: 3px solid #d4af37;
            height: 100%;
            padding: 35px;
        }

        .title {
            font-size: 42px;
            font-weight: bold;
            letter-spacing: 3px;
            color: #111827;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 35px;
        }

        .presented {
            font-size: 16px;
            color: #374151;
            margin-bottom: 15px;
        }

        .name {
            font-size: 34px;
            font-weight: bold;
            color: #1d4ed8;
            margin-bottom: 20px;
        }

        .description {
            font-size: 18px;
            color: #374151;
            line-height: 1.6;
            margin: 0 auto 35px;
            width: 80%;
        }

        .info {
            margin-top: 25px;
            font-size: 14px;
            color: #374151;
        }

        .footer {
            position: absolute;
            bottom: 45px;
            left: 80px;
            right: 80px;
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #374151;
        }

        .signature {
            text-align: center;
            width: 220px;
            border-top: 1px solid #111827;
            padding-top: 8px;
        }

        .verify {
            text-align: center;
            width: 260px;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="inner-border">
            <div class="title">CERTIFICATE</div>
            <div class="subtitle">OF PARTICIPATION</div>

            <div class="presented">This certificate is proudly presented to</div>

            <div class="name">
                Participant #{{ $certificate->user_id }}
            </div>

            <div class="description">
                For successfully participating in campus event
                <strong>Event #{{ $certificate->event_id }}</strong>
                organized through CampusEventHUB.
            </div>

            <div class="info">
                Certificate Number: <strong>{{ $certificate->certificate_number }}</strong><br>
                Issued At: <strong>{{ $certificate->issued_at->format('d F Y') }}</strong><br>
                Verification Code: <strong>{{ $certificate->verification_code }}</strong>
            </div>

            <div class="footer">
                <div class="signature">
                    Event Organizer
                </div>

                <div class="verify">
                    Verified by CampusEventHUB<br>
                    {{ $certificate->verification_code }}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
